let currentLeagueData = null;

async function loadLeague(leagueFile) {
    try {
        const response = await fetch(`data/${leagueFile}.json`);

        if (!response.ok) {
            throw new Error(`Δεν βρέθηκε το αρχείο ${leagueFile}.json`);
        }

        const data = await response.json();
        currentLeagueData = data;

        const groupControl = document.getElementById("groupControl");

        // Αν το πρωτάθλημα έχει ομίλους
        if (data.groups && data.groups.length > 0) {
            groupControl.style.display = "flex";
            populateGroupSelect(data.groups);
            displayGroup(data.groups[0].name);
        }
        // Αν το πρωτάθλημα ΔΕΝ έχει ομίλους
        else if (data.teams && data.teams.length > 0) {
            groupControl.style.display = "none";
            displayLeagueTable(data.league, data.teams);
        } else {
            groupControl.style.display = "none";
            document.getElementById("standings-container").innerHTML =
                "<p>Δεν υπάρχουν διαθέσιμα δεδομένα.</p>";
        }

    } catch (error) {
        console.error("Σφάλμα φόρτωσης βαθμολογίας:", error);
        document.getElementById("standings-container").innerHTML =
            "<p>Σφάλμα φόρτωσης δεδομένων.</p>";
    }
}

function populateGroupSelect(groups) {
    const groupSelect = document.getElementById("groupSelect");
    groupSelect.innerHTML = "";

    groups.forEach(group => {
        const option = document.createElement("option");
        option.value = group.name;
        option.textContent = group.name;
        groupSelect.appendChild(option);
    });
}

function displayGroup(groupName) {
    if (!currentLeagueData || !currentLeagueData.groups) return;

    const group = currentLeagueData.groups.find(g => g.name === groupName);
    if (!group) return;

    displayLeagueTable(`${currentLeagueData.league} - ${group.name}`, group.teams);
}

function displayLeagueTable(title, teams) {
    const container = document.getElementById("standings-container");
    container.innerHTML = "";

    let rows = "";

    teams.forEach((team, index) => {
        rows += `
            <tr>
                <td>${index + 1}</td>
                <td>${team.team}</td>
                <td>${team.played}</td>
                <td>${team.wins}</td>
                <td>${team.draws}</td>
                <td>${team.losses}</td>
                <td>${team.goalsFor}</td>
                <td>${team.goalsAgainst}</td>
                <td>${team.goalDifference}</td>
                <td>${team.points}</td>
            </tr>
        `;
    });

    container.innerHTML = `
        <section class="group-section">
            <h2>${title}</h2>
            <table class="standings-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Ομάδα</th>
                        <th>Α</th>
                        <th>Ν</th>
                        <th>Ι</th>
                        <th>Η</th>
                        <th>ΓΥ</th>
                        <th>ΓΚ</th>
                        <th>ΓΔ</th>
                        <th>Β</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
        </section>
    `;
}

document.getElementById("leagueSelect").addEventListener("change", function () {
    loadLeague(this.value);
});

document.getElementById("groupSelect").addEventListener("change", function () {
    displayGroup(this.value);
});

loadLeague("league1");