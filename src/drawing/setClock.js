const setClock = () => {
const currentDate = new Date();

function Clock() {
	this.secondRatio = currentDate.getSeconds() / 60;
	this.minuteRatio = (this.secondRatio + currentDate.getMinutes()) / 60;
	this.hourRatio = (this.minuteRatio + currentDate.getHours()) / 12;
}

return new Clock();

}

export default setClock;