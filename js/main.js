
var inputElement;


document.addEventListener("DOMContentLoaded", function () {
    const descriptionElement = document.getElementById('description');
    
    // Выполнение AJAX-запроса
    fetch('https://baconipsum.com/api/?type=lucky')
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                // Используем первый абзац описания
                const description = data[0];
                descriptionElement.textContent = description;
            } else {
                descriptionElement.textContent = 'Не удалось загрузить описание.';
            }
        })
        .catch(error => {
            descriptionElement.textContent = 'Произошла ошибка при загрузке описания.';
            console.error(error);
        });


    setTimeout(() => {
        animateFlags();
    }, 3000);
    
    inputElement = document.getElementById('search');
    const minLength = inputElement.minLength;

    inputElement.addEventListener("input", function() {
        var value = inputElement.value;
        var regex = /[!@#$%^&()]/g;
        var newValue = value.replace(regex, "");
        inputElement.value = newValue
    });

     inputElement.addEventListener("input", function() {
        var value = inputElement.value;

        if (value.length < minLength) {
            // Отображаем сообщение об ошибке
            showError("Minimal number of characters is: " + minLength);
            
            // Предотвращаем отправку формы
            if (inputElement.form) {
                inputElement.form.addEventListener("submit", function(e) {
                    e.preventDefault();
                });
            }
        } else {
            // Если введено достаточно символов, скрываем сообщение об ошибке (если оно отображено)
            hideError();
        }
    });

    // Функция для отображения сообщения об ошибке
    function showError(message) {
        // Создаем элемент для сообщения об ошибке, если он еще не существует
        var errorElement = document.getElementById('error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.id = 'error-message';
            errorElement.style.color = 'red';
            errorElement.style.marginTop = '10px'
            inputElement.parentElement.appendChild(errorElement);
        }

        // Устанавливаем текст сообщения об ошибке
        errorElement.textContent = message;
    }

    // Функция для скрытия сообщения об ошибке
    function hideError() {
        var errorElement = document.getElementById('error-message');
        if (errorElement) {
            errorElement.remove(); // Удаляем элемент сообщения об ошибке
        }
    }
});



   


/*
function animateFlags() {
    const flags = document.querySelectorAll('.flag');

    flags.forEach((flag, index) => {
        setTimeout(() => {
            flag.style.animation = 'none'; // Отключаем анимацию движения
            flag.style.transform = 'translateX(0)'; // Перемещаем флаг на исходную позицию
            flag.style.transform = 'translateY(0)'; 
            flag.style.animation = 'spin 10s linear infinite'; // Включаем анимацию вращения
        }, 400 * index);
    });
}*/
