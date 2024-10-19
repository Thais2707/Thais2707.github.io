// Esperar o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    
    // Função para validar o formulário de contato
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

    // Função para validar o formato do email
    function validarEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    }

    // Configurações do EmailJS
    const userID = 'HUwZY5Y-2oOBSw6vC'; // Cole seu User ID aqui
    const templateID = 'template_i3gvwsd'; // Cole seu Template ID aqui

    // Envio do formulário
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();

        if (!validarFormulario()) {
            return; // Impedir o envio se a validação falhar
        }

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const mensagem = document.getElementById('mensagem').value;

        // Enviar email via EmailJS
        emailjs.send(userID, templateID, {
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

        // Limpar o formulário após o envio
        document.getElementById('contact-form').reset();
    });

    // Inicializar AOS para animações
    AOS.init({
        duration: 1000, // Duração da animação
        once: true, // Anima uma única vez ao rolar
    });

    // Adicionar o efeito AOS nas seções HTML
    const testemunhosSection = document.getElementById('testemunhos');
    if (testemunhosSection) {
        testemunhosSection.setAttribute('data-aos', 'fade-up');
    }
});
