// Obtener personajes
async function getPersonajes() {
    const response = await fetch('/personajes');
    const data = await response.json();
    const personajesList = document.getElementById('personajes-list');
    personajesList.innerHTML = '';
    data.forEach(personaje => {
        const li = document.createElement('li');
        li.textContent = `${personaje.name}: ${personaje.description}`;
        personajesList.appendChild(li);
    });
}

// Obtener combates
async function getCombates() {
    const response = await fetch('/combates');
    const data = await response.json();
    const combatesList = document.getElementById('combates-list');
    combatesList.innerHTML = '';
    data.forEach(combate => {
        const li = document.createElement('li');
        li.textContent = `Combate entre Personaje ${combate.personaje1_id} y Personaje ${combate.personaje2_id}, Ganador: Personaje ${combate.ganador_id}`;
        combatesList.appendChild(li);
    });
}

// Crear personaje
document.getElementById('create-character-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('character-name').value;
    const description = document.getElementById('character-description').value;

    const response = await fetch('/personajes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description })
    });

    const result = await response.json();
    alert(result.message);
    getPersonajes(); // Actualizar la lista de personajes
});

// Crear combate
document.getElementById('create-combat-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const personaje1_id = document.getElementById('personaje1-id').value;
    const personaje2_id = document.getElementById('personaje2-id').value;
    const ganador_id = document.getElementById('ganador-id').value;

    const response = await fetch('/combates', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ personaje1_id, personaje2_id, ganador_id })
    });

    const result = await response.json();
    alert(result.message);
    getCombates(); // Actualizar la lista de combates
});
