// SALE END DATE

const saleEndDate =
new Date("July 20, 2026 23:59:59").getTime();

function updateCountdown(){

const now =
new Date().getTime();

const distance =
saleEndDate - now;

if(distance < 0){

document.getElementById(
"countdown"
).innerHTML =
"Offer Ended";

return;
}

const days =
Math.floor(
distance /
(1000 * 60 * 60 * 24)
);

const hours =
Math.floor(
(distance %
(1000 * 60 * 60 * 24))
/
(1000 * 60 * 60)
);

const minutes =
Math.floor(
(distance %
(1000 * 60 * 60))
/
(1000 * 60)
);

const seconds =
Math.floor(
(distance %
(1000 * 60))
/
1000
);

document.getElementById(
"countdown"
).innerHTML =

`${days}D : ${hours}H : ${minutes}M : ${seconds}S`;

}

updateCountdown();

setInterval(
updateCountdown,
1000
);