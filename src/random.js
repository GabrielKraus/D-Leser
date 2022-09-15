

const randomNum = (cantidad, obj) => {
	for (let i = 0; i < cantidad; i++) {
		const random = Math.floor(Math.random() * 1000);
		if (obj[random]) {
			obj[random]++;
			continue;
		}
		obj[random] = 1;
	}
	return obj;
};

process.on('message', msg => {
	const { cantidad, obj } = msg;
	const result = randomNum(cantidad, obj);
	process.send(result);
});