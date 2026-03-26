async function loadLeague(){

const response = await fetch("data/league1.json");

const teams = await response.json();

const table = document.querySelector("#standings tbody");

table.innerHTML="";

teams.forEach((team,index)=>{

const row = `
<tr>
<td>${index+1}</td>
<td>${team.team}</td>
<td>${team.games}</td>
<td>${team.wins}</td>
<td>${team.draws}</td>
<td>${team.losses}</td>
<td>${team.goals}</td>
<td>${team.points}</td>
</tr>
`;

table.innerHTML += row;

});

}

loadLeague();