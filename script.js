const getUserLogged = () => {
	const emailLogged = getEmailLogged();
	const prevUsers = JSON.parse(localStorage.getItem("users")) || []; //dammi il valore dell item o genera array vuoto
	const user = prevUsers.find((user) => user.email === emailLogged);
	return user;
};

const writeWelcomeMessage = () => {
	/* ritorna l email che stata inserita nella pag principale */
	const email = getEmailLogged();
	/* */
	const user = getUserLogged();
	/* mi torna ma non è collegato */
	if (user.counter > 1) {
		document.getElementById("root").innerHTML = `
    <h1>Bentornat* ${email}</h1>
    <button id='button-logout'>Logout</button>
    `;
	} else {
		document.getElementById("root").innerHTML = `
    <h1>Benvenut* ${email}</h1>
    <button id='button-logout'>Logout</button>
    `;
	}

	document
		.getElementById("button-logout")
		.addEventListener("click", onClickLogout);
};

const writeFormLogin = () => {
	document.getElementById("root").innerHTML = `
  <input id="input-login" placeholder="Email" />
  <button id="button-login">Login</button>`;
	document
		.getElementById("button-login")
		.addEventListener("click", onClickLogin);
};

const saveEmailLogged = () => {
	const email = document.getElementById("input-login").value;
	localStorage.setItem("email", email);
};

const deleteEmailLogged = () => {
	localStorage.removeItem("email");
};

const onClickLogin = () => {
	saveEmailLogged();
	writeWelcomeMessage();
	saveUserToStorage();
};
/*/(V)  */
const updateUser = () => {
	const prevUsers = JSON.parse(localStorage.getItem("users")) || [];
	const emailLogged = getEmailLogged();
	const newUsers = prevUsers.map((user) => {
		if (user.email === emailLogged) {
			return {
				...user,
				lastAccess: new Date(),
				counter: user.counter + 1,
			};
		} else return { ...user };
	});
	localStorage.setItem("users", JSON.stringify(newUsers));
};
document.getElementById("button-login").addEventListener("click", function () {
	console.log("clickato il bottone");

	/* addUserEmail();
	saveEmailToLocalStorage(); */
	writeWelcomeMessage();
});
//* (V) */
const saveNewUser = () => {
	const prevUsers = JSON.parse(localStorage.getItem("users")) || [];
	const newUsers = [
		...prevUsers,
		{
			email: getEmailLogged(),
			lastAccess: new Date(),
			counter: 1,
		},
	];
	localStorage.setItem("users", JSON.stringify(newUsers));
};
/* (V) */
const saveUserToStorage = () => {
	const user = getUserLogged();
	if (!!user) updateUser();
	else saveNewUser();
};

/*quando viene cliccato */
const onClickLogout = () => {
	writeFormLogin();
	deleteEmailLogged();
};
/* (V) mi torna restituisce il valore nel campo email */
const getEmailLogged = () => {
	const email = localStorage.getItem("email");
	return email;
};

window.onload = () => {
	const email = getEmailLogged();
	const isLogged = !!email;
	if (isLogged) writeWelcomeMessage();
	else writeFormLogin();
};
