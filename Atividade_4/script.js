document.addEventListener('DOMContentLoaded', function() {
    
    function validarFormulario() {
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();

        if (!nome || !email || !telefone || !mensagem) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return false;
        }

        if (!validarEmail(email)) {
            alert('Por favor, insira um endereço de email válido.');
            return false;
        }

        return true;
    }

    function validarEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    }

    const userID = 'service_6tuofp7'; 
    const templateID = 'template_i3gvwsd'; 

    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();

        if (!validarFormulario()) {
            return; 
        }

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const mensagem = document.getElementById('mensagem').value;

        emailjs.send(service_6tuofp7, template_i3gvwsd, {
            nome: nome,
            email: email,
            telefone: telefone,
            mensagem: mensagem
        }).then(function(response) {
            console.log('Email enviado com sucesso!', response.status, response.text);
            alert('Mensagem enviada com sucesso! Agradecemos pelo contato, ' + nome + '.');
        }).catch(function(error) {
            console.error('Erro ao enviar email:', error);
            alert('Erro ao enviar a mensagem. Tente novamente mais tarde.');
        });

         document.getElementById('contact-form').reset();
    });

    AOS.init({
        duration: 1000, 
        once: true, 
    });

    const testemunhosSection = document.getElementById('testemunhos');
    if (testemunhosSection) {
        testemunhosSection.setAttribute('data-aos', 'fade-up');
    }
});
