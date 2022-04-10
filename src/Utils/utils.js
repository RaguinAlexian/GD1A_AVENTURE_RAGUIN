function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function uncapitalize(string) {
	return string.charAt(0).toLowerCase() + string.slice(1);
}

function checkLoaded() {
	return document.readyState === "complete" || document.readyState === "interactive";
}