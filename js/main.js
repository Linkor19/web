document.addEventListener('DOMContentLoaded', () => {
    
    const THEME_KEY = 'photoGalleryTheme';
    
    function loadTheme() {
        const savedTheme = localStorage.getItem(THEME_KEY);
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            const themeBtn = document.getElementById('theme-toggle-btn');
            if (themeBtn) {
                themeBtn.textContent = 'Світла тема';
            }
        }
    }
    loadTheme();

    const highlights = document.querySelectorAll('.text-highlight');
    highlights.forEach(el => {
        el.style.backgroundColor = 'rgba(30, 110, 68, 0.1)';
        el.style.borderLeft = '4px solid #1e6e44';
        el.style.padding = '10px';
    });

    const mainContainer = document.querySelector('main .container');
    if (mainContainer) {
        if (!document.getElementById('js-added-para')) {
            const newPara = document.createElement('p');
            newPara.id = 'js-added-para';
            newPara.textContent = 'Цей параграф було створено та додано автоматично через JavaScript (append).';
            newPara.style.fontStyle = 'italic';
            newPara.style.color = '#555';
            newPara.style.marginTop = '20px';
            mainContainer.appendChild(newPara);
        }
    }

    const footerDate = document.getElementById('footer-date');
    if (footerDate) {
        const today = new Date();
        const dateStr = today.toLocaleDateString('uk-UA');
        if (!footerDate.innerHTML.includes('Дата:')) {
            footerDate.innerHTML += ` | Дата: ${dateStr}`;
        }
    }

    const accordionBtn = document.getElementById('accordion-btn');
    const accordionContent = document.getElementById('accordion-content');
    if (accordionBtn && accordionContent) {
        accordionBtn.addEventListener('click', () => {
            accordionContent.classList.toggle('visible');
            if (accordionContent.classList.contains('visible')) {
                accordionBtn.textContent = 'Згорнути інформацію';
            } else {
                accordionBtn.textContent = 'Дізнатися більше про проєкт';
            }
        });
    }

    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            if (isDark) {
                localStorage.setItem(THEME_KEY, 'dark');
                themeBtn.textContent = 'Світла тема';
            } else {
                localStorage.setItem(THEME_KEY, 'light');
                themeBtn.textContent = 'Змінити тему';
            }
        });
    }

    const menuLinks = document.querySelectorAll('#nav-menu a');
    menuLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.classList.add('active-hover');
        });
        link.addEventListener('mouseleave', () => {
            link.classList.remove('active-hover');
        });
    });

    let fontSizePct = 100;
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') {
            fontSizePct += 5;
            document.body.style.fontSize = fontSizePct + '%';
        } else if (e.key === 'ArrowDown') {
            fontSizePct = Math.max(50, fontSizePct - 5);
            document.body.style.fontSize = fontSizePct + '%';
        }
    });

    function clearErrors() {
        const msgBox = document.getElementById('form-messages');
        if (msgBox) msgBox.innerHTML = '';
        document.querySelectorAll('.error-border').forEach(el => el.classList.remove('error-border'));
        document.querySelectorAll('.error-text').forEach(el => el.remove());
    }

    function showError(input, text) {
        input.classList.add('error-border');
        const err = document.createElement('div');
        err.className = 'error-text';
        err.style.color = 'red';
        err.style.fontSize = '0.9em';
        err.textContent = text;
        input.parentElement.insertBefore(err, input.nextSibling);
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            clearErrors();

            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            const msgBox = document.getElementById('form-messages');

            let isValid = true;

            if (name.value.trim().length < 3) {
                showError(name, "Ім'я має бути не менше 3 символів");
                isValid = false;
            }
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value)) {
                showError(email, "Введіть коректний email");
                isValid = false;
            }
            if (message.value.trim().length < 10) {
                showError(message, "Повідомлення має бути не менше 10 символів");
                isValid = false;
            }

            if (isValid) {
                console.log('Contact data:', { name: name.value, email: email.value });
                if (msgBox) msgBox.innerHTML = '<p style="color: green; border: 1px solid green; padding: 10px;">Повідомлення надіслано!</p>';
                contactForm.reset();
            }
        });
    }

    const uploadForm = document.getElementById('upload-form');
    
    if (uploadForm) {
        uploadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            clearErrors();

            const title = document.getElementById('photo-title');
            const description = document.getElementById('photo-description');
            const fileInput = document.getElementById('photo-file');
            const msgBox = document.getElementById('form-messages');
            
            let isValid = true;

            if (title.value.trim().length < 3) {
                showError(title, "Назва має бути довшою за 3 символи");
                isValid = false;
            }

            if (description.value.trim().length < 5) {
                showError(description, "Опис занадто короткий");
                isValid = false;
            }
            if (fileInput.files.length === 0) {
                showError(fileInput, "Будь ласка, оберіть файл");
                isValid = false;
            }

            if (isValid) {
                console.log('Upload data:', { 
                    title: title.value, 
                    file: fileInput.files[0].name 
                });
                
                if (msgBox) {
                    msgBox.innerHTML = '<p style="color: green; border: 1px solid green; padding: 10px; background: #e8f5e9;">Фото успішно опубліковано!</p>';
                }
                uploadForm.reset();
            }
        });
    }
});