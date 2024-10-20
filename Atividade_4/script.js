
    function sendEmail(event) {
        event.preventDefault(); 

        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email_id').value;
        const message = document.getElementById('message').value;

        if (fullName && email && message) {
            emailjs.send('service_6tuofp7', 'template_zm2gzwh', {
                from_name: fullName,
                email_id: email,
                message: message,
            })
            .then((response) => {
                alert('Mensagem enviada com sucesso!');
            })
            .catch((error) => {
                alert('Erro ao enviar mensagem, tente novamente.');
                console.error('Erro:', error);
            });
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    }
