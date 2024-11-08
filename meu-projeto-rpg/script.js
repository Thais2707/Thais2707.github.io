let players = {};

function updatePlayerCheckboxes() {
    const playersContainer = document.getElementById('players-container');
    playersContainer.innerHTML = '';
    for (const player in players) {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = player;
        checkbox.name = 'players';
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(player));
        playersContainer.appendChild(label);
        playersContainer.appendChild(document.createElement('br'));
    }
}

document.getElementById('add-player-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const playerName = document.getElementById('player-name').value.trim();

    if (playerName && !players[playerName]) {
        players[playerName] = { missions: [], donations: [], purchases: [], totalXP: 0, totalChaos: 0 };
        document.getElementById('player-list').innerHTML += `<li>${playerName}</li>`;
        document.getElementById('player-message').textContent = `Personagem ${playerName} adicionado.`;
        updatePlayerCheckboxes();
        updateNotes();
    } else {
        document.getElementById('player-message').textContent = `Personagem ${playerName} já existe ou nome inválido.`;
    }

    document.getElementById('player-name').value = '';
});

document.getElementById('mission-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const missionName = document.getElementById('mission-name').value.trim();
    const xp = parseInt(document.getElementById('xp').value, 10);
    const chaos = parseInt(document.getElementById('chaos').value, 10);
    const items = document.getElementById('items').value.split(',').map(item => item.trim());
    const selectedPlayers = Array.from(document.querySelectorAll('input[name="players"]:checked')).map(checkbox => checkbox.value);

    if (isNaN(xp) || isNaN(chaos) || selectedPlayers.length === 0) {
        alert('Por favor, insira valores válidos para XP, Chaos e selecione jogadores.');
        return;
    }

    selectedPlayers.forEach(player => {
        if (players[player]) {
            players[player].missions.push({ name: missionName, xp, chaos, items });
            players[player].totalXP += xp; 
            players[player].totalChaos += chaos; 
        }
    });

    document.getElementById('mission-log').innerHTML += `<li>${missionName} adicionada para: ${selectedPlayers.join(', ')}</li>`;
    updateNotes();
});

document.getElementById('inventory-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const donor = document.getElementById('donor').value.trim();
    const recipient = document.getElementById('recipient').value.trim();
    const item = document.getElementById('item').value.trim();

    if (players[donor] && players[recipient]) {
        players[donor].donations.push({ item, to: recipient });
        players[recipient].donations.push({ item, from: donor });
        
        document.getElementById('inventory-log').innerHTML += `<li>${donor} doou ${item} para ${recipient}.</li>`;
        updateNotes();
    } else {
        alert('Verifique se os jogadores existem.');
    }

    document.getElementById('donor').value = ''; 
    document.getElementById('recipient').value = ''; 
    document.getElementById('item').value = '';
});

document.getElementById('purchase-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const purchaser = document.getElementById('purchaser').value.trim();
    const purchaseItem = document.getElementById('purchase-item').value.trim();
    const purchaseValue = document.getElementById('purchase-value').value.trim();

    if (players[purchaser]) {
        // Adiciona a compra ao array de compras
        players[purchaser].purchases.push({ item: `Compra: ${purchaseItem} - Valor: ${purchaseValue}`, from: 'Banco' });
        
        document.getElementById('purchase-log').innerHTML += `<li>${purchaser} comprou ${purchaseItem} por ${purchaseValue}.</li>`;
        updateNotes();
    } else {
        alert('Verifique se o jogador existe.');
    }

    document.getElementById('purchaser').value = ''; 
    document.getElementById('purchase-item').value = '';
    document.getElementById('purchase-value').value = '';
});

function updateNotes() {
    let notesContent = '';
    for (const player in players) {
        notesContent += `<h3>${player}</h3>`;
        notesContent += `<h4>Missões:</h4><ul>`;
        players[player].missions.forEach(mission => {
            notesContent += `<li>${mission.name} (XP: ${mission.xp}, Chaos: ${mission.chaos}, Itens: ${mission.items.join(', ')})</li>`;
        });
        notesContent += `</ul><h4>Doações:</h4><ul>`;
        players[player].donations.forEach(donation => {
            if (donation.to) {
                notesContent += `<li>${donation.item} doado para ${donation.to}</li>`;
            }
            if (donation.from) {
                notesContent += `<li>${donation.item} recebido de ${donation.from}</li>`;
            }
        });
        notesContent += `</ul><h4>Compras:</h4><ul>`;
        players[player].purchases.forEach(purchase => {
            notesContent += `<li>${purchase.item}</li>`;
        });
        notesContent += `</ul>`;
        
        notesContent += `<p>Total XP: ${players[player].totalXP}</p>`;
        notesContent += `<p>Total Chaos: ${players[player].totalChaos}</p>`;
    }
    document.getElementById('notes-content').innerHTML = notesContent;
}

document.getElementById('generate-pdf').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    let yPosition = 20;

    const header = () => {
        doc.setFontSize(14);
        doc.text('Relatório de Atualização', 10, 10);
        doc.setDrawColor(0, 0, 0);
        doc.line(10, 12, 200, 12);
    };

    const drawDashedLine = (y) => {
        doc.setLineDash([5, 3], 0);
        doc.line(10, y, 200, y);
        doc.setLineDash([], 0);
    };

    header();

    for (const player in players) {
        if (yPosition + 10 > pageHeight) {
            doc.addPage();
            yPosition = 20;
            header();
        }

        doc.setFontSize(12);
        doc.text(`Jogador: ${player}`, 10, yPosition);
        yPosition += 10;

        doc.text('Missões:', 10, yPosition);
        yPosition += 10;
        players[player].missions.forEach(mission => {
            if (yPosition + 10 > pageHeight) {
                doc.addPage();
                yPosition = 20;
                header();
            }
            doc.text(`- ${mission.name} (XP: ${mission.xp}, Chaos: ${mission.chaos}, Itens: ${mission.items.join(', ')})`, 20, yPosition);
            yPosition += 10;
        });

        doc.text('Doações:', 10, yPosition);
        yPosition += 10;
        players[player].donations.forEach(donation => {
            if (yPosition + 10 > pageHeight) {
                doc.addPage();
                yPosition = 20;
                header();
            }
            if (donation.to) {
                doc.text(`- ${donation.item} doado para ${donation.to}`, 20, yPosition);
                yPosition += 10;
            }
            if (donation.from) {
                doc.text(`- ${donation.item} recebido de ${donation.from}`, 20, yPosition);
                yPosition += 10;
            }
        });

        doc.text('Compras:', 10, yPosition);
        yPosition += 10;
        players[player].purchases.forEach(purchase => {
            if (yPosition + 10 > pageHeight) {
                doc.addPage();
                yPosition = 20;
                header();
            }
            doc.text(`- ${purchase.item}`, 20, yPosition);
            yPosition += 10;
        });

        doc.text(`Total XP: ${players[player].totalXP}`, 10, yPosition);
        yPosition += 10;
        doc.text(`Total Chaos: ${players[player].totalChaos}`, 10, yPosition);
        yPosition += 20;

        drawDashedLine(yPosition);
        yPosition += 10;
    }

    doc.save('notas_atualizacao.pdf');
});
