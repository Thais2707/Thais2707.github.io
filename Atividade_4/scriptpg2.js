document.addEventListener('DOMContentLoaded', function() {
    $(function() {
        $("#data").datepicker({
            dateFormat: "dd/mm/yy",
            minDate: 0 
        });
    });

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

    document.getElementById('agendamento-form').addEventListener('submit', function(event) {
        event.preventDefault();

        if (!validarFormulario()) {
            return;         }

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const data = document.getElementById('data').value;
        const mensagem = document.getElementById('mensagem').value;

        emailjs.send('service_6tuofp7', 'template_i3gvwsd', {
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

        document.getElementById('agendamento-form').reset();
    });
});
