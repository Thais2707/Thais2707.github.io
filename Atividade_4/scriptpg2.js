$(function() {
    $("#data").datepicker({
        dateFormat: "dd/mm/yy", 
        minDate: 0 
    });
});

$('#contact-form').on('submit', function(event) {
    event.preventDefault(); 

    const nome = $('#fullName').val();
    const email = $('#email_id').val();
    const telefone = $('#telefone').val();
    const data = $('#data').val();
    const mensagem = $('#message').val();

    emailjs.send('service_6tuofp7', 'template_12d1dm9', {
        from_name: nome,
        from_email: email,
        from_telefone: telefone,
        data: data,
        message: mensagem
    })
    .then(function(response) {
        alert('Agendamento enviado com sucesso!');
        $('#contact-form')[0].reset(); 
    }, function(error) {
        alert('Erro ao enviar o agendamento: ' + JSON.stringify(error));
    });
});
