
function Validator(option){
    var selectorRules = {};

    function getParent(element, selector){
        while(element.parentElement){
            if(element.parentElement.matches(selector)){
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }
    
    function validate(inputElement, rule){
        var formMessage = getParent(inputElement, option.formGroupSelector).querySelector(option.errorSelector);
        var errorMessage;

        var rules = selectorRules[rule.selector];
        for(let i = 0; i < rules.length; i++){
            switch(inputElement.type){
                case 'checkbox':
                case 'radio':
                    errorMessage = rules[i](
                        document.querySelector(rule.selector +':checked')
                    );
                    break;
                default: 
                    errorMessage = rules[i](inputElement.value);
            }
            
            if(errorMessage) break;
        }

        if(errorMessage){
            formMessage.innerText = errorMessage;
            formMessage.parentElement.classList.add('invalid');
        }else{
            formMessage.innerText = '';
            formMessage.parentElement.classList.remove('invalid');
        }
        return !errorMessage;
    }


    var formElement = document.querySelector(option.form);

    if(formElement){
        formElement.onsubmit = function(e){
            e.preventDefault();

            var isFormValues = true;

            option.rules.forEach(function(rule){
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if(!isValid)
                    isFormValues = false;
            })

            if (isFormValues){
                if(typeof option.onSubmit === 'function'){
                    var enableInputs = formElement.querySelectorAll('[name]:not([disabled])');
                    var formValues = Array.from(enableInputs).reduce(function(values, input){
                        switch(input.type){
                            case 'radio': 
                                values[input.name] =  formElement.querySelector('input[name="' + input.name +'"]:checked').value;
                                break;
                            case 'checkbox':
                                if(!input.matches(':checked')) {
                                    values[input.name] = '';
                                    return values;
                                }
                                if(!Array.isArray(values[input.name])){
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value)
                                break;
                            case 'file':
                                values[input.name] =  input.files;
                                break;
                            default:
                                values[input.name] =  input.value;
                        }
                        return values;
                    },{})

                    option.onSubmit(formValues);
                }else{
                    formElement.onsubmit();
                }
            }
        }

        option.rules.forEach(function(rule){
            if(Array.isArray(selectorRules[rule.selector])){
                selectorRules[rule.selector].push(rule.test)
            }else{
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElements = formElement.querySelectorAll(rule.selector);
            Array.from(inputElements).forEach(function(inputElement){
                var formMessage = getParent(inputElement, option.formGroupSelector).querySelector(option.errorSelector);
    
                if(inputElement){
                    inputElement.onblur = function(){
                        var errorMessage = rule.test(inputElement.value);
                        validate(inputElement, rule);
                    }
        
                    inputElement.oninput = function(){
                        formMessage.innerText = '';
                        formMessage.parentElement.classList.remove('invalid');
                    }
                }
            })
        })
    }


}

Validator.isRequired = function(selector){
    return {
        selector: selector,
        test: function(value){
            return value ? '' : 'Vui lòng nhập trường này';
        }
    }
}

Validator.isEmail = function(selector){
    return {
        selector: selector,
        test: function(value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? '' : 'Nhập email';
        }
    }
}

Validator.isPassword = function(selector, min){
    return {
        selector: selector,
        test: function(value){
            return value.length >= min ? '' : `Mật khẩu phải dài hơn ${min-1} ký tự`;
        }
    }
}

Validator.isComfirmPassword = function(selector, password){
    return {
        selector: selector,
        test: function(value){
            return password()===value ? undefined : 'Mật khẩu không khớp';
        }
    }
}