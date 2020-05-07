const UICtrl = (() => {
	console.log("running");

	const addDeleteX = function () {
		const trs = document.querySelectorAll(".table-body tr");
		for (let i = 0; i < trs.length; i++) {
			let newBtn = document.createElement("td");
			newBtn.className = "delete-btn";
			newBtn.innerHTML = "X";
			trs[i].appendChild(newBtn);
		}
	};

	return {
		getEntryValue: function () {
			const entry = document.querySelector("#new-entry").value;
			return entry;
		},
		getTrs: addDeleteX,
	};
})();

const EntryHandler = (() => {
	const Entry = function (id, time, entry, name) {
		this.id = id;
		this.time = time;
		this.entry = entry;
		this.name = name;
	};

	// Add all entrys to array of objects.

	const data = [{
    entries: []
  }];

	const getTime = function () {
		const fullDate = new Date();
		let year = fullDate.getFullYear();
		const month = fullDate.getMonth().toString().padStart(2, "0");
		const date = fullDate.getDate().toString().padStart(2, "0");
		const hours = fullDate.getHours().toString().padStart(2, "0");
		const minutes = fullDate.getMinutes().toString().padStart(2, "0");
		const seconds = fullDate.getSeconds().toString().padStart(2, "0");
		const time = `${hours}:${minutes}:${seconds} ${month}/${date}/${year} `;
		return time;
	};

	const addEntry = function () {
    let id;
    if (data[0].entries.length > 0) {
      id = data[0].entries[data[0].entries.length - 1].id + 1;
    } else {
      id = 0;
    }
    const time = getTime();
		const entry = UICtrl.getEntryValue();
		const name = document.querySelector("#name-entry").value;
		const newEntry = new Entry(id, time, entry, name);
    data[0].entries.push(newEntry)
    // return newEntry;
	};
	return {
		getAddEntry: function () {
			return addEntry();
    },
    getDataEntries: function() {
      return data[0].entries;
		},
		getIdMap: function() {
			let newArr = data[0].entries.map(entry => {
				return entry.id;
			})
			console.log(newArr.indexOf(3));
		}
		
	};
})();

// Takes in the EntryHandler Module, deals only with logic of site
const Controller = (function (EntryHndlr) {
	document.querySelector(".submit-button").addEventListener("click", () => {
    const newEntry = EntryHndlr.getAddEntry();
    let data = EntryHndlr.getDataEntries();
	});
})(EntryHandler);


/* 
  TODO: Need to make each Item in Data[0].entries render to UI, without repeating. 
*/

// data.forEach(item => {
//   const table = document.querySelector(".table-body");
//   const newRow = table.insertRow(-1);
//   const cell0 = newRow.insertCell(0);
//   const cell1 = newRow.insertCell(1);
//   const cell2 = newRow.insertCell(2);
//   cell0.textContent = item.time;
//   cell1.textContent = item.entry;
//   cell2.textContent = item.name;
// })

