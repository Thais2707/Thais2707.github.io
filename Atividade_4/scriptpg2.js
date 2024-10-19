// Esperar o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa o calendário
    $(function() {
        $("#data").datepicker({
            dateFormat: "dd/mm/yy",
            minDate: 0 // Impede a seleção de datas passadas
        });
    });

    // Função para validar o formulário de agendamento
    function validarFormulario() {
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const data = document.getElementById('data').value.trim();

        if (!nome || !email || !telefone || !data) {
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

    // Enviar o formulário
    document.getElementById('agendamento-form').addEventListener('submit', function(event) {
        event.preventDefault();

        if (!validarFormulario()) {
            return; // Impedir o envio se a validação falhar
        }

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const data = document.getElementById('data').value;
        const mensagem = document.getElementById('mensagem').value;

        // Aqui você pode integrar o envio via EmailJS
        emailjs.send('SEU_USER_ID', 'template_id', {
            nome: nome,
            email: email,
            telefone: telefone,
            data: data,
            mensagem: mensagem
        }).then(function(response) {
            console.log('Email enviado com sucesso!', response.status, response.text);
            alert('Agendamento enviado com sucesso!');
        }).catch(function(error) {
            console.error('Erro ao enviar email:', error);
            alert('Erro ao enviar o agendamento. Tente novamente mais tarde.');
        });

        // Limpar o formulário após o envio
        document.getElementById('agendamento-form').reset();
    });
});
