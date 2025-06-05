export function strToFloat(str: string, defaultValue: number = 0) {
	console.log('str:', str);

	const trimmedStr = str.replaceAll(',', '.').trim();
	if (!trimmedStr) {
		return defaultValue;
	}

	const result = parseFloat(trimmedStr);
	if (isNaN(result) || !/^[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?$/.test(trimmedStr)) {
		return defaultValue;
	}
	return result;
}