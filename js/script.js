"use strict"

// SPOLLERS
// роблю колекцію всіх об'єктів, що мають data-spollers
const spollersArray = document.querySelectorAll('[data-spollers]');
if (spollersArray.length > 0) {
	// отримую звичайні спойлери
	// переводжу колекцію в масив
	const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
		return !item.dataset.spollers.split(",")[0];
	});
	// ініціалізую звичайні спойлери
	if (spollersRegular.length > 0) {
		initSpollers(spollersRegular);
	}

	// // отримання спойлерів з медіа запитами
	// const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
	// 	return item.dataset.spollers.split(",")[0];
	// });

	// // ініціалізую спойлери з медіа запитами
	// if (spollersMedia.length > 0) {
	// 	// константа з пустим масивом
	// 	const breakpointsArray = [];
	// 	// перебираю масив з медіа запитами
	// 	spollersMedia.forEach(item => {
	// 		// отримую рядок з параметрами data-spollers, створюю пустий об'єкт і наповнюю
	// 		const params = item.dataset.spollers;
	// 		const breakpoint = {};
	// 		const paramsArray = params.split(",");
	// 		breakpoint.value = paramsArray[0];
	// 		breakpoint.type = paramsArray[1] ? paramsArray[1].trim : "max";
	// 		breakpoint.item = item;
	// 		breakpointsArray.push(breakpoint);
	// 	});

	// 	// отримую унікальні брейкпоінти
	// 	// певним чином переробляю breakpointsArray
	// 	let mediaQueries = breakpointsArray.map(function (item) {
	// 		return '(' + item.type + "-width:" + item.value + "px)," + item.value + ',' + item.type;
	// 	});
	// 	mediaQueries = mediaQueries.filter(function (item, index, self) {
	// 		return self.indexOf(item) === index;
	// 	});

	// 	// робота з кожним брейкпоінтом
	// 	mediaQueries.forEach(breakpoint => {
	// 		const paramsArray = breakpoint.split(",");
	// 		const mediaBreakpoint = paramsArray[1];
	// 		const mediaType = paramsArray[2];
	// 		// своєрідно слухаю брейкпоінт
	// 		const matchMedia = window.matchMedia(paramsArray[0]);

	// 		// об'єкти з потрібними умовами
	// 		const spollersArray = breakpointsArray.filter(function (item) {
	// 			if (item.value === mediaBreakpoint && item.type === mediaType) {
	// 				return true;
	// 			}
	// 		});
	// 		// подія
	// 		matchMedia.addEventListener(function () {
	// 			initSpollers(spollersArray, matchMedia);
	// 		});
	// 		initSpollers(spollersArray, matchMedia);
	// 	});
	// }
	// ініціалізація
	function initSpollers(spollersArray, matchMedia = false) {
		spollersArray.forEach(spollersBlock => {
			spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
			if (matchMedia.matches || !matchMedia) {
				spollersBlock.classList.add('_init');
				initSpollerBody(spollersBlock);
				spollersBlock.addEventListener("click", setSpollerAction);
			} else {
				spollersBlock.classList.remove('_init');
				initSpollerBody(spollersBlock, false);
				spollersBlock.removeEventListener("click", setSpollerAction);
			}
		});
	}
	// робота з контентом
	function initSpollerBody(spollersBlock, hideSpollerBody = true) {
		// колекція заголовків спойлера
		const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
		if (spollerTitles.length > 0) {
			
		}
	}
}