//Conversion
const persenNitrogen = document.getElementById("persenNitrogen");
const ppmNitrogen = document.getElementById("ppmNitrogen");
const kgHaNitrogen = document.getElementById("kgHaNitrogen");
const persenFosfor = document.getElementById("persenFosfor");
const ppmFosfor = document.getElementById("ppmFosfor");
const kgHaFosfor = document.getElementById("kgHaFosfor");
const meKalium = document.getElementById("meKalium");
const cmolKalium = document.getElementById("cmolKalium");
const ppmKalium = document.getElementById("ppmKalium");
const kgHaKalium = document.getElementById("kgHaKalium");
const submitN = document.querySelector(".submitN");
const submitP = document.querySelector(".submitP");
const submitK = document.querySelector(".submitK");

submitN.addEventListener("click", () => {
    if (ppmNitrogen.value == 0) {
        ppmNitrogen.value = persenNitrogen.value * 10000;
    } else if (ppmNitrogen.value > 0) {
        persenNitrogen.value = ppmNitrogen.value / 10000;
    }
    kgHaNitrogen.value = (ppmNitrogen.value * 10000 * 0.5 * 1500) / 1000000;
});
submitP.addEventListener("click", () => {
    if (ppmFosfor.value == 0) {
        ppmFosfor.value = persenFosfor.value * 10000;
    } else if (ppmFosfor.value > 0) {
        persenFosfor.value = ppmFosfor.value / 10000;
    }
    kgHaFosfor.value = (ppmFosfor.value * 10000 * 0.5 * 1500) / 1000000;
});
submitK.addEventListener("click", () => {
    meKalium.value = cmolKalium.value;
    ppmKalium.value = cmolKalium.value * 391;
    kgHaKalium.value = (ppmKalium.value * 10000 * 0.5 * 1500) / 1000000;
});

//Fertilizer Need Calculation

//Select Option
const fase = document.querySelector(".fase");
const form = document.querySelector(".form");

elStages = document.createElement("select");
elStages.setAttribute("class", "stages");
elStages.innerHTML = `<option value="bbb">Before Start Flowering</option>
                        <option value="bsf">Before End Flowering</option>
                        <option value="bef">Before Veration</option>
                        <option value="bv">Before Harvest</option>
                        <option value="bh">Before Bud Burst</option>
                        <option value="all">All</option>`;

selectNitrogen = document.createElement("div");
selectNitrogen.setAttribute("class", "divNit");
selectNitrogen.innerHTML = `<p class="pilih">Pilih jenis pupuk tunggal untuk tambahan Nitrogen</p>
                            <select class="selectNit">   
                            <option value=""></option>     
                            <option value="Urea">Urea</option>
                            <option value="Ammonium Sulfate">ZA</option>
                            <option value="Ammonium Nitrate">Ammonium Nitrate</option>
                            </select> `;
selectFosfor = document.createElement("div");
selectFosfor.setAttribute("class", "divFos");
selectFosfor.innerHTML = `<p class="pilih">Pilih jenis pupuk tunggal untuk tambahan P2O5</p>
                        <select class="selectFos">
                        <option value=""></option>
                        <option value="TSP">TSP</option>
                            <option value="SP36">SP36</option></select>`;
selectKalium = document.createElement("div");
selectKalium.setAttribute("class", "divKal");
selectKalium.innerHTML = `<p class="pilih"> Pilih jenis pupuk tunggal untuk tambahan K2O</p>
                         <select class="selectKal"><option value=""></option>
                         <option value="KCL">KCL</option>
                            <option value="Kalium Sulfate">ZK</option>
                            </select>`;
fase.addEventListener("change", () => {
    if (fase.value != "total") {
        form.insertBefore(elStages, form.childNodes[8]);
    } else if (fase.value === "total") {
        form.removeChild(form.childNodes[8]);
    }
});

// //Calculation
const inputN = document.getElementById("kadarHaraNitrogen");
const inputP = document.getElementById("kadarHaraFosfor");
const inputK = document.getElementById("kadarHaraKalium");
const inputTan = document.getElementById("jumlahTanaman");
const hitung = document.querySelector(".hitung");
const result = document.querySelector(".result");

hitung.addEventListener("click", () => {
    const stage = document.querySelector(".stages");
    const faktorTan = parseInt(inputTan.value) / 3333;
    let totalKebutuhanN = 180 * faktorTan;
    let totalKebutuhanP = 177 * faktorTan;
    let totalKebutuhanK = 232 * faktorTan;
    if (fase.value == "total") {
        let totalTambahanN = totalKebutuhanN - parseInt(inputN.value);
        let totalTambahanP = totalKebutuhanP - parseInt(inputP.value);
        let totalTambahanK = totalKebutuhanK - parseInt(inputK.value);
        totalTambahanN <= 0 ? (totalTambahanN = 0) : totalTambahanN;
        totalTambahanP <= 0 ? (totalTambahanP = 0) : totalTambahanP;
        totalTambahanK <= 0 ? (totalTambahanK = 0) : totalTambahanK;
        if (totalTambahanN == 0 && totalTambahanP == 0 && totalTambahanK == 0) {
            result.innerHTML = tercukupi();
        } else {
            arrayResult = [totalTambahanN, totalTambahanP, totalTambahanK];
            const kebutuhanNPK = Math.ceil(Math.min(...arrayResult) * 6.666666666667);
            const lebihN = totalTambahanN - Math.min(...arrayResult);
            const lebihP = totalTambahanP - Math.min(...arrayResult);
            const lebihK = totalTambahanK - Math.min(...arrayResult);

            function NPKSaja() {
                return `<p>Lahan anda mengalami defisiensi hara. Anda perlu menambahkan pupuk majemuk (NPK). </p>
            <p>Kebutuhan <strong>pupuk NPK</strong> anda sebanyak <strong>${kebutuhanNPK} Kg/Ha</strong>.</p>`;
            }

            function tidakTercukupi(nutrientA, jumlahA, nutrientB, jumlahB) {
                return `<p>Lahan anda mengalami defisiensi hara. Anda perlu menambahkan pupuk majemuk (NPK) dan pupuk tunggal. </p>
            <p>Kebutuhan <strong>pupuk NPK</strong> anda sebanyak <strong>${kebutuhanNPK} Kg/Ha</strong> dengan
            tambahan pupuk tunggal <span class="tambahanA"> <strong> ${nutrientA} </strong> sebesar <strong> ${jumlahA} </strong> </span> <strong> Kg/Ha </strong> dan pupuk tunggal <span class="tambahanB"> <strong> ${nutrientB} </strong> sebesar <strong> ${jumlahB} </strong> </span> <strong> Kg/Ha </strong>. </p>`;
            }

            function tidakTercukupiSatu(nutrientA, jumlahA) {
                return `<p>Lahan anda mengalami defisiensi hara. Anda perlu menambahkan pupuk majemuk (NPK) dan pupuk tunggal. </p>
            <p>Kebutuhan <strong>pupuk NPK</strong> anda sebanyak <strong>${kebutuhanNPK} Kg/Ha</strong> dengan
            tambahan pupuk tunggal <span class="tambahanA1"> ${nutrientA} sebesar ${jumlahA} </span> Kg/Ha.</p>`;
            }

            function tanpaNPK(nutrientA, jumlahA, nutrientB, jumlahB) {
                return `<p>Lahan anda mengalami defisiensi hara.</p>
            <p> Anda perlu menambahkan pupuk tunggal <span class="tambahanA"> <strong> ${nutrientA} </strong> sebesar <strong> ${jumlahA} </strong> </span> <strong> Kg/Ha </strong> dan pupuk tunggal <span class="tambahanB"> <strong> ${nutrientB} </strong> sebesar <strong> ${jumlahB} </strong> </span> <strong> Kg/Ha </strong>.</p>`;
            }

            function tanpaNPK1(nutrientA, jumlahA) {
                return `<p>Lahan anda mengalami defisiensi hara.</p>
            <p> Anda perlu menambahkan pupuk tunggal <span class="tambahanA"> <strong> ${nutrientA} </strong> sebesar <strong> ${jumlahA} </strong> </span> <strong> Kg/Ha </strong>.</p>`;
            }
            const tambahUrea = Math.ceil(totalTambahanN * 2.1739130434782 * 2);
            const tambahZA = Math.ceil(totalTambahanN * 4.7619047619047 * 2);
            const tambahAN = Math.ceil(totalTambahanN * 2.9411764705882 * 2);
            const tambahTSP = Math.ceil(totalTambahanP * 2.1739130434782 * 10);
            const tambahSP = Math.ceil(totalTambahanP * 2.77777777778 * 10);
            const tambahKCL = Math.ceil(totalTambahanK * 1.6666666667 * 3.333333);
            const tambahZK = Math.ceil(totalTambahanK * 2 * 3.3333333);
            const lebihUrea = Math.ceil(lebihN * 2.1739130434782 * 2);
            const lebihZA = Math.ceil(lebihN * 4.7619047619047 * 2);
            const lebihAN = Math.ceil(lebihN * 2.9411764705882 * 2);
            const lebihTSP = Math.ceil(lebihP * 2.1739130434782 * 10);
            const lebihSP = Math.ceil(lebihP * 2.77777777778 * 10);
            const lebihKCL = Math.ceil(lebihK * 1.6666666667 * 3.333333);
            const lebihZK = Math.ceil(lebihK * 2 * 3.3333333);
            if (kebutuhanNPK > 0) {
                if (Math.min(...arrayResult) == totalTambahanN && Math.min(...arrayResult) == totalTambahanP && Math.min(...arrayResult) == totalTambahanK) {
                    result.innerHTML = NPKSaja();
                } else if (Math.min(...arrayResult) == totalTambahanN && Math.min(...arrayResult) == totalTambahanP) {
                    result.innerHTML = tidakTercukupiSatu("K2O", lebihK);
                    result.appendChild(selectKalium);
                    const tambahanA1 = document.querySelector(".tambahanA1");
                    const selectKal = document.querySelector(".selectKal");
                    selectKal.addEventListener("change", () => {
                        if (selectKal.value == "KCL") {
                            tambahanA1.innerHTML = `<strong> KCL </strong> sebesar <strong>  ${lebihKCL} </strong>`;
                        } else if (selectKal.value == "Kalium Sulfate") {
                            tambahanA1.innerHTML = `<strong> ZK </strong> sebesar <strong> ${lebihZK} </strong>`;
                        }
                    });
                } else if (Math.min(...arrayResult) == totalTambahanN && Math.min(...arrayResult) == totalTambahanK) {
                    result.innerHTML = tidakTercukupi("P2O5", lebihP);
                    result.appendChild(selectFosfor);
                    const tambahanA1 = document.querySelector(".tambahanA1");
                    const selectFos = document.querySelector(".selectFos");
                    selectFos.addEventListener("change", () => {
                        if (selectFos.value == "TSP") {
                            tambahanA1.innerHTML = `<strong> TSP </strong>  sebesar <strong> ${lebihTSP} </strong>`;
                        } else if (selectFos.value == "SP36") {
                            tambahanA1.innerHTML = `<strong> SP36 </strong> sebesar <strong> ${lebihSP} </strong>`;
                        }
                    });
                } else if (Math.min(...arrayResult) == totalTambahanP && Math.min(...arrayResult) == totalTambahanK) {
                    result.innerHTML = tidakTercukupi("Nitrogen", lebihN);
                    result.appendChild(selectNitrogen);
                    const tambahanA1 = document.querySelector(".tambahanA1");
                    const selectNit = document.querySelector(".selectNit");
                    selectNit.addEventListener("change", () => {
                        if (selectNit.value == "Urea") {
                            tambahanA1.innerHTML = `<strong> Urea </strong>  sebesar <strong> ${lebihUrea} </strong>`;
                        } else if (selectNit.value == "Ammonium Sulfate") {
                            tambahanA1.innerHTML = `<strong> Ammonium Sulfate </strong> sebesar <strong> ${lebihZA} </strong>`;
                        } else if (selectNit.value == "Ammonium Nitrate") {
                            tambahanA1.innerHTML = `<strong> Ammonium Nitrate </strong> sebesar <strong> ${lebihAN} </strong>`;
                        }
                    });
                } else if (Math.min(...arrayResult) == totalTambahanN) {
                    result.innerHTML = tidakTercukupi("P2O5", lebihP, "K2O", lebihK);
                    result.appendChild(selectFosfor);
                    result.appendChild(selectKalium);
                    const tambahanA = document.querySelector(".tambahanA");
                    const tambahanB = document.querySelector(".tambahanB");
                    const selectFos = document.querySelector(".selectFos");
                    const selectKal = document.querySelector(".selectKal");
                    selectFos.addEventListener("change", () => {
                        if (selectFos.value == "TSP") {
                            tambahanA.innerHTML = `<strong> TSP </strong>  sebesar <strong> ${lebihTSP} </strong>`;
                        } else if (selectFos.value == "SP36") {
                            tambahanA.innerHTML = `<strong> SP36 </strong> sebesar <strong> ${lebihSP} </strong>`;
                        }
                    });
                    selectKal.addEventListener("change", () => {
                        if (selectKal.value == "KCL") {
                            tambahanB.innerHTML = `<strong> KCL </strong> sebesar <strong>  ${lebihKCL} </strong>`;
                        } else if (selectKal.value == "Kalium Sulfate") {
                            tambahanB.innerHTML = `<strong> ZK </strong> sebesar <strong> ${lebihZK} </strong>`;
                        }
                    });
                } else if (Math.min(...arrayResult) == totalTambahanP) {
                    result.innerHTML = tidakTercukupi("Nitrogen", lebihN, "K2O", lebihK);
                    result.appendChild(selectNitrogen);
                    result.appendChild(selectKalium);
                    const tambahanA = document.querySelector(".tambahanA");
                    const tambahanB = document.querySelector(".tambahanB");
                    const selectNit = document.querySelector(".selectNit");
                    const selectKal = document.querySelector(".selectKal");
                    selectNit.addEventListener("change", () => {
                        if (selectNit.value == "Urea") {
                            tambahanA.innerHTML = `<strong> Urea </strong>  sebesar <strong> ${lebihUrea} </strong>`;
                        } else if (selectNit.value == "Ammonium Sulfate") {
                            tambahanA.innerHTML = `<strong> Ammonium Sulfate </strong> sebesar <strong> ${lebihZA} </strong>`;
                        } else if (selectNit.value == "Ammonium Nitrate") {
                            tambahanA.innerHTML = `<strong> Ammonium Nitrate </strong> sebesar <strong> ${lebihAN} </strong>`;
                        }
                    });
                    selectKal.addEventListener("change", () => {
                        if (selectKal.value == "KCL") {
                            tambahanB.innerHTML = `<strong> KCL </strong> sebesar <strong>  ${lebihKCL} </strong>`;
                        } else if (selectKal.value == "Kalium Sulfate") {
                            tambahanB.innerHTML = `<strong> ZK </strong> sebesar <strong> ${lebihZK} </strong>`;
                        }
                    });
                } else if (Math.min(...arrayResult) == totalTambahanK) {
                    result.innerHTML = tidakTercukupi("Nitrogen", lebihN, "P2O5", lebihP);
                    result.appendChild(selectNitrogen);
                    result.appendChild(selectFosfor);
                    const tambahanA = document.querySelector(".tambahanA");
                    const tambahanB = document.querySelector(".tambahanB");
                    const selectNit = document.querySelector(".selectNit");
                    const selectFos = document.querySelector(".selectFos");
                    selectNit.addEventListener("change", () => {
                        if (selectNit.value == "Urea") {
                            tambahanA.innerHTML = `<strong> Urea </strong>  sebesar <strong> ${lebihUrea} </strong>`;
                        } else if (selectNit.value == "Ammonium Sulfate") {
                            tambahanA.innerHTML = `<strong> Ammonium Sulfate </strong> sebesar <strong> ${lebihZA} </strong>`;
                        } else if (selectNit.value == "Ammonium Nitrate") {
                            tambahanA.innerHTML = `<strong> Ammonium Nitrate </strong> sebesar <strong> ${lebihAN} </strong>`;
                        }
                    });
                    selectFos.addEventListener("change", () => {
                        if (selectFos.value == "TSP") {
                            tambahanB.innerHTML = `<strong> TSP </strong>  sebesar <strong> ${lebihTSP} </strong>`;
                        } else if (selectFos.value == "SP36") {
                            tambahanB.innerHTML = `<strong> SP36 </strong> sebesar <strong> ${lebihSP} </strong>`;
                        }
                    });
                }
            } else if (kebutuhanNPK <= 0) {
                if (totalTambahanP == 0 && totalTambahanN == 0) {
                    result.innerHTML = tanpaNPK1("K2O", totalTambahanK);
                    result.appendChild(selectKalium);
                    const tambahanA = document.querySelector(".tambahanA");
                    const selectKal = document.querySelector(".selectKal");
                    selectKal.addEventListener("change", () => {
                        if (selectKal.value == "KCL") {
                            tambahanA.innerHTML = `<strong> KCL </strong> sebesar <strong>  ${tambahKCL} </strong>`;
                        } else if (selectKal.value == "Kalium Sulfate") {
                            tambahanA.innerHTML = `<strong> ZK </strong> sebesar <strong> ${tambahZK} </strong>`;
                        }
                    });
                } else if (totalTambahanP == 0 && totalTambahanK == 0) {
                    result.innerHTML = tanpaNPK1("Nitrogen", totalTambahanN);
                    result.appendChild(selectNitrogen);
                    const tambahanA = document.querySelector(".tambahanA");
                    const selectNit = document.querySelector(".selectNit");
                    selectNit.addEventListener("change", () => {
                        if (selectNit.value == "Urea") {
                            tambahanA.innerHTML = `<strong> Urea </strong>  sebesar <strong> ${tambahUrea} </strong>`;
                        } else if (selectNit.value == "Ammonium Sulfate") {
                            tambahanA.innerHTML = `<strong> Ammonium Sulfate </strong> sebesar <strong> ${tambahZA} </strong>`;
                        } else if (selectNit.value == "Ammonium Nitrate") {
                            tambahanA.innerHTML = `<strong> Ammonium Nitrate </strong> sebesar <strong> ${tambahAN} </strong>`;
                        }
                    });
                } else if (totalTambahanN == 0 && totalTambahanK == 0) {
                    result.innerHTML = tanpaNPK1("P2O5", totalTambahanP);
                    result.appendChild(selectFosfor);
                    const tambahanA = document.querySelector(".tambahanA");
                    const selectFos = document.querySelector(".selectFos");
                    selectFos.addEventListener("change", () => {
                        if (selectFos.value == "TSP") {
                            tambahanA.innerHTML = `<strong> TSP </strong>  sebesar <strong> ${tambahTSP} </strong>`;
                        } else if (selectFos.value == "SP36") {
                            tambahanA.innerHTML = `<strong> SP36 </strong> sebesar <strong> ${tambahSP} </strong>`;
                        }
                    });
                } else if (totalTambahanN == 0) {
                    result.innerHTML = tanpaNPK("P2O5", totalTambahanP, "K2O", totalTambahanK);
                    result.appendChild(selectFosfor);
                    result.appendChild(selectKalium);
                    const tambahanA = document.querySelector(".tambahanA");
                    const tambahanB = document.querySelector(".tambahanB");
                    const selectFos = document.querySelector(".selectFos");
                    const selectKal = document.querySelector(".selectKal");
                    selectFos.addEventListener("change", () => {
                        if (selectFos.value == "TSP") {
                            tambahanA.innerHTML = `<strong> TSP </strong>  sebesar <strong> ${tambahTSP} </strong>`;
                        } else if (selectFos.value == "SP36") {
                            tambahanA.innerHTML = `<strong> SP36 </strong> sebesar <strong> ${tambahSP} </strong>`;
                        }
                    });
                    selectKal.addEventListener("change", () => {
                        if (selectKal.value == "KCL") {
                            tambahanB.innerHTML = `<strong> KCL </strong> sebesar <strong>  ${tambahKCL} </strong>`;
                        } else if (selectKal.value == "Kalium Sulfate") {
                            tambahanB.innerHTML = `<strong> ZK </strong> sebesar <strong> ${tambahZK} </strong>`;
                        }
                    });
                } else if (totalTambahanP == 0) {
                    result.innerHTML = tanpaNPK("Nitrogen", totalTambahanN, "K2O", totalTambahanK);
                    result.appendChild(selectNitrogen);
                    result.appendChild(selectKalium);
                    const tambahanA = document.querySelector(".tambahanA");
                    const tambahanB = document.querySelector(".tambahanB");
                    const selectNit = document.querySelector(".selectNit");
                    const selectKal = document.querySelector(".selectKal");
                    selectNit.addEventListener("change", () => {
                        if (selectNit.value == "Urea") {
                            tambahanA.innerHTML = `<strong> Urea </strong>  sebesar <strong> ${tambahUrea} </strong>`;
                        } else if (selectNit.value == "Ammonium Sulfate") {
                            tambahanA.innerHTML = `<strong> Ammonium Sulfate </strong> sebesar <strong> ${tambahZA} </strong>`;
                        } else if (selectNit.value == "Ammonium Nitrate") {
                            tambahanA.innerHTML = `<strong> Ammonium Nitrate </strong> sebesar <strong> ${tambahAN} </strong>`;
                        }
                    });
                    selectKal.addEventListener("change", () => {
                        if (selectKal.value == "KCL") {
                            tambahanB.innerHTML = `<strong> KCL </strong> sebesar <strong>  ${tambahKCL} </strong>`;
                        } else if (selectKal.value == "Kalium Sulfate") {
                            tambahanB.innerHTML = `<strong> ZK </strong> sebesar <strong> ${tambahZK} </strong>`;
                        }
                    });
                } else if (totalTambahanK == 0) {
                    result.innerHTML = tanpaNPK("Nitrogen", totalTambahanN, "P2O5", totalTambahanP);
                    result.appendChild(selectNitrogen);
                    result.appendChild(selectFosfor);
                    const tambahanA = document.querySelector(".tambahanA");
                    const tambahanB = document.querySelector(".tambahanB");
                    const selectNit = document.querySelector(".selectNit");
                    const selectFos = document.querySelector(".selectFos");
                    selectNit.addEventListener("change", () => {
                        if (selectNit.value == "Urea") {
                            tambahanA.innerHTML = `<strong> Urea </strong>  sebesar <strong> ${tambahUrea} </strong>`;
                        } else if (selectNit.value == "Ammonium Sulfate") {
                            tambahanA.innerHTML = `<strong> Ammonium Sulfate </strong> sebesar <strong> ${tambahZA} </strong>`;
                        } else if (selectNit.value == "Ammonium Nitrate") {
                            tambahanA.innerHTML = `<strong> Ammonium Nitrate </strong> sebesar <strong> ${tambahAN} </strong>`;
                        }
                    });
                    selectFos.addEventListener("change", () => {
                        if (selectFos.value == "TSP") {
                            tambahanB.innerHTML = `<strong> TSP </strong>  sebesar <strong> ${tambahTSP} </strong>`;
                        } else if (selectFos.value == "SP36") {
                            tambahanB.innerHTML = `<strong> SP36 </strong> sebesar <strong> ${tambahSP} </strong>`;
                        }
                    });
                }
            }
        }
    } else if (fase.value == "short") {
        let shortKebutuhanN = totalKebutuhanN * 0.3278;
        let shortKebutuhanP = totalKebutuhanP * 0.6045;
        let shortKebutuhanK = totalKebutuhanK * 0.5172;
        switch (stage.value) {
            case "bbb":
                shortKebutuhanN *= 0.14;
                shortKebutuhanP *= 0.16;
                shortKebutuhanK *= 0.15;
                break;
            case "bsf":
                shortKebutuhanN *= 0.14;
                shortKebutuhanP *= 0.16;
                shortKebutuhanK *= 0.11;
                break;
            case "bef":
                shortKebutuhanN *= 0.38;
                shortKebutuhanP *= 0.4;
                shortKebutuhanK *= 0.5;
                break;
            case "bv":
                shortKebutuhanN *= 0;
                shortKebutuhanP *= 0;
                shortKebutuhanK *= 0.09;
                break;
            case "bh":
                shortKebutuhanN *= 0.34;
                shortKebutuhanP *= 0.28;
                shortKebutuhanK *= 0.15;
                break;
        }
        let totalTambahanN = shortKebutuhanN - parseInt(inputN.value);
        let totalTambahanP = shortKebutuhanP - parseInt(inputP.value);
        let totalTambahanK = shortKebutuhanK - parseInt(inputK.value);
        totalTambahanN <= 0 ? (totalTambahanN = 0) : totalTambahanN;
        totalTambahanP <= 0 ? (totalTambahanP = 0) : totalTambahanP;
        totalTambahanK <= 0 ? (totalTambahanK = 0) : totalTambahanK;
        if (totalTambahanN == 0 && totalTambahanP == 0 && totalTambahanK == 0) {
            result.innerHTML = tercukupi();
        } else {
            arrayResult = [totalTambahanN, totalTambahanP, totalTambahanK];
            const kebutuhanNPK = Math.ceil(Math.min(...arrayResult) * 6.666666666667);
            const lebihN = totalTambahanN - Math.min(...arrayResult);
            const lebihP = totalTambahanP - Math.min(...arrayResult);
            const lebihK = totalTambahanK - Math.min(...arrayResult);

            function NPKSaja() {
                return `<p>Lahan anda mengalami defisiensi hara. Anda perlu menambahkan pupuk majemuk (NPK). </p>
            <p>Kebutuhan <strong>pupuk NPK</strong> anda sebanyak <strong>${kebutuhanNPK} Kg/Ha</strong></p>.`;
            }

            function tidakTercukupi(nutrientA, jumlahA, nutrientB, jumlahB) {
                return `<p>Lahan anda mengalami defisiensi hara. Anda perlu menambahkan pupuk majemuk (NPK) dan pupuk tunggal. </p>
            <p>Kebutuhan <strong>pupuk NPK</strong> anda sebanyak <strong>${kebutuhanNPK} Kg/Ha</strong> dengan
            tambahan pupuk tunggal <span class="tambahanA"> <strong> ${nutrientA} </strong> sebesar <strong> ${jumlahA} </strong> </span> <strong> Kg/Ha </strong> dan pupuk tunggal <span class="tambahanB"> <strong> ${nutrientB} </strong> sebesar <strong> ${jumlahB} </strong> </span> <strong> Kg/Ha </strong>. </p>`;
            }

            function tidakTercukupiSatu(nutrientA, jumlahA) {
                return `<p>Lahan anda mengalami defisiensi hara. Anda perlu menambahkan pupuk majemuk (NPK) dan pupuk tunggal. </p>
            <p>Kebutuhan <strong>pupuk NPK</strong> anda sebanyak <strong>${kebutuhanNPK} Kg/Ha</strong> dengan
            tambahan pupuk tunggal <span class="tambahanA1"> ${nutrientA} sebesar ${jumlahA} </span> Kg/Ha.</p>`;
            }

            function tanpaNPK(nutrientA, jumlahA, nutrientB, jumlahB) {
                return `<p>Lahan anda mengalami defisiensi hara.</p>
            <p> Anda perlu menambahkan pupuk tunggal <span class="tambahanA"> <strong> ${nutrientA} </strong> sebesar <strong> ${jumlahA} </strong> </span> <strong> Kg/Ha </strong> dan pupuk tunggal <span class="tambahanB"> <strong> ${nutrientB} </strong> sebesar <strong> ${jumlahB} </strong> </span> <strong> Kg/Ha </strong>. </p>`;
            }

            function tanpaNPK1(nutrientA, jumlahA) {
                return `<p>Lahan anda mengalami defisiensi hara.</p>
            <p> Anda perlu menambahkan pupuk tunggal <span class="tambahanA"> <strong> ${nutrientA} </strong> sebesar <strong> ${jumlahA} </strong> </span> <strong> Kg/Ha </strong>. </p>`;
            }
            const tambahUrea = Math.ceil(totalTambahanN * 2.1739130434782 * 2);
            const tambahZA = Math.ceil(totalTambahanN * 4.7619047619047 * 2);
            const tambahAN = Math.ceil(totalTambahanN * 2.9411764705882 * 2);
            const tambahTSP = Math.ceil(totalTambahanP * 2.1739130434782 * 10);
            const tambahSP = Math.ceil(totalTambahanP * 2.77777777778 * 10);
            const tambahKCL = Math.ceil(totalTambahanK * 1.6666666667 * 3.333333);
            const tambahZK = Math.ceil(totalTambahanK * 2 * 3.3333333);
            const lebihUrea = Math.ceil(lebihN * 2.1739130434782 * 2);
            const lebihZA = Math.ceil(lebihN * 4.7619047619047 * 2);
            const lebihAN = Math.ceil(lebihN * 2.9411764705882 * 2);
            const lebihTSP = Math.ceil(lebihP * 2.1739130434782 * 10);
            const lebihSP = Math.ceil(lebihP * 2.77777777778 * 10);
            const lebihKCL = Math.ceil(lebihK * 1.6666666667 * 3.333333);
            const lebihZK = Math.ceil(lebihK * 2 * 3.3333333);
            if (kebutuhanNPK > 0) {
                if (Math.min(...arrayResult) == totalTambahanN && Math.min(...arrayResult) == totalTambahanP && Math.min(...arrayResult) == totalTambahanK) {
                    result.innerHTML = NPKSaja();
                } else if (Math.min(...arrayResult) == totalTambahanN && Math.min(...arrayResult) == totalTambahanP) {
                    result.innerHTML = tidakTercukupiSatu("K2O", lebihK);
                    result.appendChild(selectKalium);
                    const tambahanA1 = document.querySelector(".tambahanA1");
                    const selectKal = document.querySelector(".selectKal");
                    selectKal.addEventListener("change", () => {
                        if (selectKal.value == "KCL") {
                            tambahanA1.innerHTML = `<strong> KCL </strong> sebesar <strong>  ${lebihKCL} </strong>`;
                        } else if (selectKal.value == "Kalium Sulfate") {
                            tambahanA1.innerHTML = `<strong> ZK </strong> sebesar <strong> ${lebihZK} </strong>`;
                        }
                    });
                } else if (Math.min(...arrayResult) == totalTambahanN && Math.min(...arrayResult) == totalTambahanK) {
                    result.innerHTML = tidakTercukupi("P2O5", lebihP);
                    result.appendChild(selectFosfor);
                    const tambahanA1 = document.querySelector(".tambahanA1");
                    const selectFos = document.querySelector(".selectFos");
                    selectFos.addEventListener("change", () => {
                        if (selectFos.value == "TSP") {
                            tambahanA1.innerHTML = `<strong> TSP </strong>  sebesar <strong> ${lebihTSP} </strong>`;
                        } else if (selectFos.value == "SP36") {
                            tambahanA1.innerHTML = `<strong> SP36 </strong> sebesar <strong> ${lebihSP} </strong>`;
                        }
                    });
                } else if (Math.min(...arrayResult) == totalTambahanP && Math.min(...arrayResult) == totalTambahanK) {
                    result.innerHTML = tidakTercukupi("Nitrogen", lebihN);
                    result.appendChild(selectNitrogen);
                    const tambahanA1 = document.querySelector(".tambahanA1");
                    const selectNit = document.querySelector(".selectNit");
                    selectNit.addEventListener("change", () => {
                        if (selectNit.value == "Urea") {
                            tambahanA1.innerHTML = `<strong> Urea </strong>  sebesar <strong> ${lebihUrea} </strong>`;
                        } else if (selectNit.value == "Ammonium Sulfate") {
                            tambahanA1.innerHTML = `<strong> Ammonium Sulfate </strong> sebesar <strong> ${lebihZA} </strong>`;
                        } else if (selectNit.value == "Ammonium Nitrate") {
                            tambahanA1.innerHTML = `<strong> Ammonium Nitrate </strong> sebesar <strong> ${lebihAN} </strong>`;
                        }
                    });
                } else if (Math.min(...arrayResult) == totalTambahanN) {
                    result.innerHTML = tidakTercukupi("P2O5", lebihP, "K2O", lebihK);
                    result.appendChild(selectFosfor);
                    result.appendChild(selectKalium);
                    const tambahanA = document.querySelector(".tambahanA");
                    const tambahanB = document.querySelector(".tambahanB");
                    const selectFos = document.querySelector(".selectFos");
                    const selectKal = document.querySelector(".selectKal");
                    selectFos.addEventListener("change", () => {
                        if (selectFos.value == "TSP") {
                            tambahanA.innerHTML = `<strong> TSP </strong>  sebesar <strong> ${lebihTSP} </strong>`;
                        } else if (selectFos.value == "SP36") {
                            tambahanA.innerHTML = `<strong> SP36 </strong> sebesar <strong> ${lebihSP} </strong>`;
                        }
                    });
                    selectKal.addEventListener("change", () => {
                        if (selectKal.value == "KCL") {
                            tambahanB.innerHTML = `<strong> KCL </strong> sebesar <strong>  ${lebihKCL} </strong>`;
                        } else if (selectKal.value == "Kalium Sulfate") {
                            tambahanB.innerHTML = `<strong> ZK </strong> sebesar <strong> ${lebihZK} </strong>`;
                        }
                    });
                } else if (Math.min(...arrayResult) == totalTambahanP) {
                    result.innerHTML = tidakTercukupi("Nitrogen", lebihN, "K2O", lebihK);
                    result.appendChild(selectNitrogen);
                    result.appendChild(selectKalium);
                    const tambahanA = document.querySelector(".tambahanA");
                    const tambahanB = document.querySelector(".tambahanB");
                    const selectNit = document.querySelector(".selectNit");
                    const selectKal = document.querySelector(".selectKal");
                    selectNit.addEventListener("change", () => {
                        if (selectNit.value == "Urea") {
                            tambahanA.innerHTML = `<strong> Urea </strong>  sebesar <strong> ${lebihUrea} </strong>`;
                        } else if (selectNit.value == "Ammonium Sulfate") {
                            tambahanA.innerHTML = `<strong> Ammonium Sulfate </strong> sebesar <strong> ${lebihZA} </strong>`;
                        } else if (selectNit.value == "Ammonium Nitrate") {
                            tambahanA.innerHTML = `<strong> Ammonium Nitrate </strong> sebesar <strong> ${lebihAN} </strong>`;
                        }
                    });
                    selectKal.addEventListener("change", () => {
                        if (selectKal.value == "KCL") {
                            tambahanB.innerHTML = `<strong> KCL </strong> sebesar <strong>  ${lebihKCL} </strong>`;
                        } else if (selectKal.value == "Kalium Sulfate") {
                            tambahanB.innerHTML = `<strong> ZK </strong> sebesar <strong> ${lebihZK} </strong>`;
                        }
                    });
                } else if (Math.min(...arrayResult) == totalTambahanK) {
                    result.innerHTML = tidakTercukupi("Nitrogen", lebihN, "P2O5", lebihP);
                    result.appendChild(selectNitrogen);
                    result.appendChild(selectFosfor);
                    const tambahanA = document.querySelector(".tambahanA");
                    const tambahanB = document.querySelector(".tambahanB");
                    const selectNit = document.querySelector(".selectNit");
                    const selectFos = document.querySelector(".selectFos");
                    selectNit.addEventListener("change", () => {
                        if (selectNit.value == "Urea") {
                            tambahanA.innerHTML = `<strong> Urea </strong>  sebesar <strong> ${lebihUrea} </strong>`;
                        } else if (selectNit.value == "Ammonium Sulfate") {
                            tambahanA.innerHTML = `<strong> Ammonium Sulfate </strong> sebesar <strong> ${lebihZA} </strong>`;
                        } else if (selectNit.value == "Ammonium Nitrate") {
                            tambahanA.innerHTML = `<strong> Ammonium Nitrate </strong> sebesar <strong> ${lebihAN} </strong>`;
                        }
                    });
                    selectFos.addEventListener("change", () => {
                        if (selectFos.value == "TSP") {
                            tambahanB.innerHTML = `<strong> TSP </strong>  sebesar <strong> ${lebihTSP} </strong>`;
                        } else if (selectFos.value == "SP36") {
                            tambahanB.innerHTML = `<strong> SP36 </strong> sebesar <strong> ${lebihSP} </strong>`;
                        }
                    });
                }
            } else if (kebutuhanNPK <= 0) {
                if (totalTambahanP == 0 && totalTambahanN == 0) {
                    result.innerHTML = tanpaNPK1("K2O", totalTambahanK);
                    result.appendChild(selectKalium);
                    const tambahanA = document.querySelector(".tambahanA");
                    const selectKal = document.querySelector(".selectKal");
                    selectKal.addEventListener("change", () => {
                        if (selectKal.value == "KCL") {
                            tambahanA.innerHTML = `<strong> KCL </strong> sebesar <strong>  ${tambahKCL} </strong>`;
                        } else if (selectKal.value == "Kalium Sulfate") {
                            tambahanA.innerHTML = `<strong> ZK </strong> sebesar <strong> ${tambahZK} </strong>`;
                        }
                    });
                } else if (totalTambahanP == 0 && totalTambahanK == 0) {
                    result.innerHTML = tanpaNPK1("Nitrogen", totalTambahanN);
                    result.appendChild(selectNitrogen);
                    const tambahanA = document.querySelector(".tambahanA");
                    const selectNit = document.querySelector(".selectNit");
                    selectNit.addEventListener("change", () => {
                        if (selectNit.value == "Urea") {
                            tambahanA.innerHTML = `<strong> Urea </strong>  sebesar <strong> ${tambahUrea} </strong>`;
                        } else if (selectNit.value == "Ammonium Sulfate") {
                            tambahanA.innerHTML = `<strong> Ammonium Sulfate </strong> sebesar <strong> ${tambahZA} </strong>`;
                        } else if (selectNit.value == "Ammonium Nitrate") {
                            tambahanA.innerHTML = `<strong> Ammonium Nitrate </strong> sebesar <strong> ${tambahAN} </strong>`;
                        }
                    });
                } else if (totalTambahanN == 0 && totalTambahanK == 0) {
                    result.innerHTML = tanpaNPK1("P2O5", totalTambahanP);
                    result.appendChild(selectFosfor);
                    const tambahanA = document.querySelector(".tambahanA");
                    const selectFos = document.querySelector(".selectFos");
                    selectFos.addEventListener("change", () => {
                        if (selectFos.value == "TSP") {
                            tambahanA.innerHTML = `<strong> TSP </strong>  sebesar <strong> ${tambahTSP} </strong>`;
                        } else if (selectFos.value == "SP36") {
                            tambahanA.innerHTML = `<strong> SP36 </strong> sebesar <strong> ${tambahSP} </strong>`;
                        }
                    });
                } else if (totalTambahanN == 0) {
                    result.innerHTML = tanpaNPK("P2O5", totalTambahanP, "K2O", totalTambahanK);
                    result.appendChild(selectFosfor);
                    result.appendChild(selectKalium);
                    const tambahanA = document.querySelector(".tambahanA");
                    const tambahanB = document.querySelector(".tambahanB");
                    const selectFos = document.querySelector(".selectFos");
                    const selectKal = document.querySelector(".selectKal");
                    selectFos.addEventListener("change", () => {
                        if (selectFos.value == "TSP") {
                            tambahanA.innerHTML = `<strong> TSP </strong>  sebesar <strong> ${tambahTSP} </strong>`;
                        } else if (selectFos.value == "SP36") {
                            tambahanA.innerHTML = `<strong> SP36 </strong> sebesar <strong> ${tambahSP} </strong>`;
                        }
                    });
                    selectKal.addEventListener("change", () => {
                        if (selectKal.value == "KCL") {
                            tambahanB.innerHTML = `<strong> KCL </strong> sebesar <strong>  ${tambahKCL} </strong>`;
                        } else if (selectKal.value == "Kalium Sulfate") {
                            tambahanB.innerHTML = `<strong> ZK </strong> sebesar <strong> ${tambahZK} </strong>`;
                        }
                    });
                } else if (totalTambahanP == 0) {
                    result.innerHTML = tanpaNPK("Nitrogen", totalTambahanN, "K2O", totalTambahanK);
                    result.appendChild(selectNitrogen);
                    result.appendChild(selectKalium);
                    const tambahanA = document.querySelector(".tambahanA");
                    const tambahanB = document.querySelector(".tambahanB");
                    const selectNit = document.querySelector(".selectNit");
                    const selectKal = document.querySelector(".selectKal");
                    selectNit.addEventListener("change", () => {
                        if (selectNit.value == "Urea") {
                            tambahanA.innerHTML = `<strong> Urea </strong>  sebesar <strong> ${tambahUrea} </strong>`;
                        } else if (selectNit.value == "Ammonium Sulfate") {
                            tambahanA.innerHTML = `<strong> Ammonium Sulfate </strong> sebesar <strong> ${tambahZA} </strong>`;
                        } else if (selectNit.value == "Ammonium Nitrate") {
                            tambahanA.innerHTML = `<strong> Ammonium Nitrate </strong> sebesar <strong> ${tambahAN} </strong>`;
                        }
                    });
                    selectKal.addEventListener("change", () => {
                        if (selectKal.value == "KCL") {
                            tambahanB.innerHTML = `<strong> KCL </strong> sebesar <strong>  ${tambahKCL} </strong>`;
                        } else if (selectKal.value == "Kalium Sulfate") {
                            tambahanB.innerHTML = `<strong> ZK </strong> sebesar <strong> ${tambahZK} </strong>`;
                        }
                    });
                } else if (totalTambahanK == 0) {
                    result.innerHTML = tanpaNPK("Nitrogen", totalTambahanN, "P2O5", totalTambahanP);
                    result.appendChild(selectNitrogen);
                    result.appendChild(selectFosfor);
                    const tambahanA = document.querySelector(".tambahanA");
                    const tambahanB = document.querySelector(".tambahanB");
                    const selectNit = document.querySelector(".selectNit");
                    const selectFos = document.querySelector(".selectFos");
                    selectNit.addEventListener("change", () => {
                        if (selectNit.value == "Urea") {
                            tambahanA.innerHTML = `<strong> Urea </strong>  sebesar <strong> ${tambahUrea} </strong>`;
                        } else if (selectNit.value == "Ammonium Sulfate") {
                            tambahanA.innerHTML = `<strong> Ammonium Sulfate </strong> sebesar <strong> ${tambahZA} </strong>`;
                        } else if (selectNit.value == "Ammonium Nitrate") {
                            tambahanA.innerHTML = `<strong> Ammonium Nitrate </strong> sebesar <strong> ${tambahAN} </strong>`;
                        }
                    });
                    selectFos.addEventListener("change", () => {
                        if (selectFos.value == "TSP") {
                            tambahanB.innerHTML = `<strong> TSP </strong>  sebesar <strong> ${tambahTSP} </strong>`;
                        } else if (selectFos.value == "SP36") {
                            tambahanB.innerHTML = `<strong> SP36 </strong> sebesar <strong> ${tambahSP} </strong>`;
                        }
                    });
                }
            }
        }
    } else if (fase.value == "long") {
        let longKebutuhanN = totalKebutuhanN * 0.6722;
        let longKebutuhanP = totalKebutuhanP * 0.3955;
        let longKebutuhanK = totalKebutuhanK * 0.4828;
        switch (stage.value) {
            case "bbb":
                longKebutuhanN *= 0.14;
                longKebutuhanP *= 0.16;
                longKebutuhanK *= 0.15;
                break;
            case "bsf":
                longKebutuhanN *= 0.14;
                longKebutuhanP *= 0.16;
                longKebutuhanK *= 0.11;
                break;
            case "bef":
                longKebutuhanN *= 0.38;
                longKebutuhanP *= 0.4;
                longKebutuhanK *= 0.5;
                break;
            case "bv":
                longKebutuhanN *= 0;
                longKebutuhanP *= 0;
                longKebutuhanK *= 0.09;
                break;
            case "bh":
                longKebutuhanN *= 0.34;
                longKebutuhanP *= 0.28;
                longKebutuhanK *= 0.15;
                break;
        }
        let totalTambahanN = longKebutuhanN - parseInt(inputN.value);
        let totalTambahanP = longKebutuhanP - parseInt(inputP.value);
        let totalTambahanK = longKebutuhanK - parseInt(inputK.value);
        totalTambahanN <= 0 ? (totalTambahanN = 0) : totalTambahanN;
        totalTambahanP <= 0 ? (totalTambahanP = 0) : totalTambahanP;
        totalTambahanK <= 0 ? (totalTambahanK = 0) : totalTambahanK;
        if (totalTambahanN == 0 && totalTambahanP == 0 && totalTambahanK == 0) {
            result.innerHTML = tercukupi();
        } else {
            arrayResult = [totalTambahanN, totalTambahanP, totalTambahanK];
            const kebutuhanNPK = Math.ceil(Math.min(...arrayResult) * 6.666666666667);
            const lebihN = totalTambahanN - Math.min(...arrayResult);
            const lebihP = totalTambahanP - Math.min(...arrayResult);
            const lebihK = totalTambahanK - Math.min(...arrayResult);

            function NPKSaja() {
                return `<p>Lahan anda mengalami defisiensi hara. Anda perlu menambahkan pupuk majemuk (NPK).</p>
            <p>Kebutuhan <strong>pupuk NPK</strong> anda sebanyak <strong>${kebutuhanNPK} Kg/Ha</strong>.</p>`;
            }

            function tidakTercukupi(nutrientA, jumlahA, nutrientB, jumlahB) {
                return `<p>Lahan anda mengalami defisiensi hara. Anda perlu menambahkan pupuk majemuk (NPK) dan pupuk tunggal.</p>
            <p>Kebutuhan <strong>pupuk NPK</strong> anda sebanyak <strong>${kebutuhanNPK} Kg/Ha</strong> dengan
            tambahan pupuk tunggal <span class="tambahanA"> <strong> ${nutrientA} </strong> sebesar <strong> ${jumlahA} </strong> </span> <strong> Kg/Ha </strong> dan pupuk tunggal <span class="tambahanB"> <strong> ${nutrientB} </strong> sebesar <strong> ${jumlahB} </strong> </span> <strong> Kg/Ha </strong>. </p>`;
            }

            function tidakTercukupiSatu(nutrientA, jumlahA) {
                return `<p>Lahan anda mengalami defisiensi hara. Anda perlu menambahkan pupuk majemuk (NPK) dan pupuk tunggal.</p>
            <p>Kebutuhan <strong>pupuk NPK</strong> anda sebanyak <strong>${kebutuhanNPK} Kg/Ha</strong> dengan
            tambahan pupuk tunggal <span class="tambahanA1"> ${nutrientA} sebesar ${jumlahA} </span> Kg/Ha.</p>`;
            }

            function tanpaNPK(nutrientA, jumlahA, nutrientB, jumlahB) {
                return `<p>Lahan anda mengalami defisiensi hara.</p>
            <p> Anda perlu menambahkan pupuk tunggal <span class="tambahanA"> <strong> ${nutrientA} </strong> sebesar <strong> ${jumlahA} </strong> </span> <strong> Kg/Ha </strong> dan pupuk tunggal <span class="tambahanB"> <strong> ${nutrientB} </strong> sebesar <strong> ${jumlahB} </strong> </span> <strong> Kg/Ha </strong>.</p>`;
            }

            function tanpaNPK1(nutrientA, jumlahA) {
                return `<p>Lahan anda mengalami defisiensi hara.</p>
            <p> Anda perlu menambahkan pupuk tunggal <span class="tambahanA"> <strong> ${nutrientA} </strong> sebesar <strong> ${jumlahA} </strong> </span> <strong> Kg/Ha </strong>.</p>`;
            }
            const tambahUrea = Math.ceil(totalTambahanN * 2.1739130434782 * 2);
            const tambahZA = Math.ceil(totalTambahanN * 4.7619047619047 * 2);
            const tambahAN = Math.ceil(totalTambahanN * 2.9411764705882 * 2);
            const tambahTSP = Math.ceil(totalTambahanP * 2.1739130434782 * 10);
            const tambahSP = Math.ceil(totalTambahanP * 2.77777777778 * 10);
            const tambahKCL = Math.ceil(totalTambahanK * 1.6666666667 * 3.333333);
            const tambahZK = Math.ceil(totalTambahanK * 2 * 3.3333333);
            const lebihUrea = Math.ceil(lebihN * 2.1739130434782 * 2);
            const lebihZA = Math.ceil(lebihN * 4.7619047619047 * 2);
            const lebihAN = Math.ceil(lebihN * 2.9411764705882 * 2);
            const lebihTSP = Math.ceil(lebihP * 2.1739130434782 * 10);
            const lebihSP = Math.ceil(lebihP * 2.77777777778 * 10);
            const lebihKCL = Math.ceil(lebihK * 1.6666666667 * 3.333333);
            const lebihZK = Math.ceil(lebihK * 2 * 3.3333333);
            if (kebutuhanNPK > 0) {
                if (Math.min(...arrayResult) == totalTambahanN && Math.min(...arrayResult) == totalTambahanP && Math.min(...arrayResult) == totalTambahanK) {
                    result.innerHTML = NPKSaja();
                } else if (Math.min(...arrayResult) == totalTambahanN && Math.min(...arrayResult) == totalTambahanP) {
                    result.innerHTML = tidakTercukupiSatu("K2O", lebihK);
                    result.appendChild(selectKalium);
                    const tambahanA1 = document.querySelector(".tambahanA1");
                    const selectKal = document.querySelector(".selectKal");
                    selectKal.addEventListener("change", () => {
                        if (selectKal.value == "KCL") {
                            tambahanA1.innerHTML = `<strong> KCL </strong> sebesar <strong>  ${lebihKCL} </strong>`;
                        } else if (selectKal.value == "Kalium Sulfate") {
                            tambahanA1.innerHTML = `<strong> ZK </strong> sebesar <strong> ${lebihZK} </strong>`;
                        }
                    });
                } else if (Math.min(...arrayResult) == totalTambahanN && Math.min(...arrayResult) == totalTambahanK) {
                    result.innerHTML = tidakTercukupi("P2O5", lebihP);
                    result.appendChild(selectFosfor);
                    const tambahanA1 = document.querySelector(".tambahanA1");
                    const selectFos = document.querySelector(".selectFos");
                    selectFos.addEventListener("change", () => {
                        if (selectFos.value == "TSP") {
                            tambahanA1.innerHTML = `<strong> TSP </strong>  sebesar <strong> ${lebihTSP} </strong>`;
                        } else if (selectFos.value == "SP36") {
                            tambahanA1.innerHTML = `<strong> SP36 </strong> sebesar <strong> ${lebihSP} </strong>`;
                        }
                    });
                } else if (Math.min(...arrayResult) == totalTambahanP && Math.min(...arrayResult) == totalTambahanK) {
                    result.innerHTML = tidakTercukupi("Nitrogen", lebihN);
                    result.appendChild(selectNitrogen);
                    const tambahanA1 = document.querySelector(".tambahanA1");
                    const selectNit = document.querySelector(".selectNit");
                    selectNit.addEventListener("change", () => {
                        if (selectNit.value == "Urea") {
                            tambahanA1.innerHTML = `<strong> Urea </strong>  sebesar <strong> ${lebihUrea} </strong>`;
                        } else if (selectNit.value == "Ammonium Sulfate") {
                            tambahanA1.innerHTML = `<strong> Ammonium Sulfate </strong> sebesar <strong> ${lebihZA} </strong>`;
                        } else if (selectNit.value == "Ammonium Nitrate") {
                            tambahanA1.innerHTML = `<strong> Ammonium Nitrate </strong> sebesar <strong> ${lebihAN} </strong>`;
                        }
                    });
                } else if (Math.min(...arrayResult) == totalTambahanN) {
                    result.innerHTML = tidakTercukupi("P2O5", lebihP, "K2O", lebihK);
                    result.appendChild(selectFosfor);
                    result.appendChild(selectKalium);
                    const tambahanA = document.querySelector(".tambahanA");
                    const tambahanB = document.querySelector(".tambahanB");
                    const selectFos = document.querySelector(".selectFos");
                    const selectKal = document.querySelector(".selectKal");
                    selectFos.addEventListener("change", () => {
                        if (selectFos.value == "TSP") {
                            tambahanA.innerHTML = `<strong> TSP </strong>  sebesar <strong> ${lebihTSP} </strong>`;
                        } else if (selectFos.value == "SP36") {
                            tambahanA.innerHTML = `<strong> SP36 </strong> sebesar <strong> ${lebihSP} </strong>`;
                        }
                    });
                    selectKal.addEventListener("change", () => {
                        if (selectKal.value == "KCL") {
                            tambahanB.innerHTML = `<strong> KCL </strong> sebesar <strong>  ${lebihKCL} </strong>`;
                        } else if (selectKal.value == "Kalium Sulfate") {
                            tambahanB.innerHTML = `<strong> ZK </strong> sebesar <strong> ${lebihZK} </strong>`;
                        }
                    });
                } else if (Math.min(...arrayResult) == totalTambahanP) {
                    result.innerHTML = tidakTercukupi("Nitrogen", lebihN, "K2O", lebihK);
                    result.appendChild(selectNitrogen);
                    result.appendChild(selectKalium);
                    const tambahanA = document.querySelector(".tambahanA");
                    const tambahanB = document.querySelector(".tambahanB");
                    const selectNit = document.querySelector(".selectNit");
                    const selectKal = document.querySelector(".selectKal");
                    selectNit.addEventListener("change", () => {
                        if (selectNit.value == "Urea") {
                            tambahanA.innerHTML = `<strong> Urea </strong>  sebesar <strong> ${lebihUrea} </strong>`;
                        } else if (selectNit.value == "Ammonium Sulfate") {
                            tambahanA.innerHTML = `<strong> Ammonium Sulfate </strong> sebesar <strong> ${lebihZA} </strong>`;
                        } else if (selectNit.value == "Ammonium Nitrate") {
                            tambahanA.innerHTML = `<strong> Ammonium Nitrate </strong> sebesar <strong> ${lebihAN} </strong>`;
                        }
                    });
                    selectKal.addEventListener("change", () => {
                        if (selectKal.value == "KCL") {
                            tambahanB.innerHTML = `<strong> KCL </strong> sebesar <strong>  ${lebihKCL} </strong>`;
                        } else if (selectKal.value == "Kalium Sulfate") {
                            tambahanB.innerHTML = `<strong> ZK </strong> sebesar <strong> ${lebihZK} </strong>`;
                        }
                    });
                } else if (Math.min(...arrayResult) == totalTambahanK) {
                    result.innerHTML = tidakTercukupi("Nitrogen", lebihN, "P2O5", lebihP);
                    result.appendChild(selectNitrogen);
                    result.appendChild(selectFosfor);
                    const tambahanA = document.querySelector(".tambahanA");
                    const tambahanB = document.querySelector(".tambahanB");
                    const selectNit = document.querySelector(".selectNit");
                    const selectFos = document.querySelector(".selectFos");
                    selectNit.addEventListener("change", () => {
                        if (selectNit.value == "Urea") {
                            tambahanA.innerHTML = `<strong> Urea </strong>  sebesar <strong> ${lebihUrea} </strong>`;
                        } else if (selectNit.value == "Ammonium Sulfate") {
                            tambahanA.innerHTML = `<strong> Ammonium Sulfate </strong> sebesar <strong> ${lebihZA} </strong>`;
                        } else if (selectNit.value == "Ammonium Nitrate") {
                            tambahanA.innerHTML = `<strong> Ammonium Nitrate </strong> sebesar <strong> ${lebihAN} </strong>`;
                        }
                    });
                    selectFos.addEventListener("change", () => {
                        if (selectFos.value == "TSP") {
                            tambahanB.innerHTML = `<strong> TSP </strong>  sebesar <strong> ${lebihTSP} </strong>`;
                        } else if (selectFos.value == "SP36") {
                            tambahanB.innerHTML = `<strong> SP36 </strong> sebesar <strong> ${lebihSP} </strong>`;
                        }
                    });
                }
            } else if (kebutuhanNPK <= 0) {
                if (totalTambahanP == 0 && totalTambahanN == 0) {
                    result.innerHTML = tanpaNPK1("K2O", totalTambahanK);
                    result.appendChild(selectKalium);
                    const tambahanA = document.querySelector(".tambahanA");
                    const selectKal = document.querySelector(".selectKal");
                    selectKal.addEventListener("change", () => {
                        if (selectKal.value == "KCL") {
                            tambahanA.innerHTML = `<strong> KCL </strong> sebesar <strong>  ${tambahKCL} </strong>`;
                        } else if (selectKal.value == "Kalium Sulfate") {
                            tambahanA.innerHTML = `<strong> ZK </strong> sebesar <strong> ${tambahZK} </strong>`;
                        }
                    });
                } else if (totalTambahanP == 0 && totalTambahanK == 0) {
                    result.innerHTML = tanpaNPK1("Nitrogen", totalTambahanN);
                    result.appendChild(selectNitrogen);
                    const tambahanA = document.querySelector(".tambahanA");
                    const selectNit = document.querySelector(".selectNit");
                    selectNit.addEventListener("change", () => {
                        if (selectNit.value == "Urea") {
                            tambahanA.innerHTML = `<strong> Urea </strong>  sebesar <strong> ${tambahUrea} </strong>`;
                        } else if (selectNit.value == "Ammonium Sulfate") {
                            tambahanA.innerHTML = `<strong> Ammonium Sulfate </strong> sebesar <strong> ${tambahZA} </strong>`;
                        } else if (selectNit.value == "Ammonium Nitrate") {
                            tambahanA.innerHTML = `<strong> Ammonium Nitrate </strong> sebesar <strong> ${tambahAN} </strong>`;
                        }
                    });
                } else if (totalTambahanN == 0 && totalTambahanK == 0) {
                    result.innerHTML = tanpaNPK1("P2O5", totalTambahanP);
                    result.appendChild(selectFosfor);
                    const tambahanA = document.querySelector(".tambahanA");
                    const selectFos = document.querySelector(".selectFos");
                    selectFos.addEventListener("change", () => {
                        if (selectFos.value == "TSP") {
                            tambahanA.innerHTML = `<strong> TSP </strong>  sebesar <strong> ${tambahTSP} </strong>`;
                        } else if (selectFos.value == "SP36") {
                            tambahanA.innerHTML = `<strong> SP36 </strong> sebesar <strong> ${tambahSP} </strong>`;
                        }
                    });
                } else if (totalTambahanN == 0) {
                    result.innerHTML = tanpaNPK("P2O5", totalTambahanP, "K2O", totalTambahanK);
                    result.appendChild(selectFosfor);
                    result.appendChild(selectKalium);
                    const tambahanA = document.querySelector(".tambahanA");
                    const tambahanB = document.querySelector(".tambahanB");
                    const selectFos = document.querySelector(".selectFos");
                    const selectKal = document.querySelector(".selectKal");
                    selectFos.addEventListener("change", () => {
                        if (selectFos.value == "TSP") {
                            tambahanA.innerHTML = `<strong> TSP </strong>  sebesar <strong> ${tambahTSP} </strong>`;
                        } else if (selectFos.value == "SP36") {
                            tambahanA.innerHTML = `<strong> SP36 </strong> sebesar <strong> ${tambahSP} </strong>`;
                        }
                    });
                    selectKal.addEventListener("change", () => {
                        if (selectKal.value == "KCL") {
                            tambahanB.innerHTML = `<strong> KCL </strong> sebesar <strong>  ${tambahKCL} </strong>`;
                        } else if (selectKal.value == "Kalium Sulfate") {
                            tambahanB.innerHTML = `<strong> ZK </strong> sebesar <strong> ${tambahZK} </strong>`;
                        }
                    });
                } else if (totalTambahanP == 0) {
                    result.innerHTML = tanpaNPK("Nitrogen", totalTambahanN, "K2O", totalTambahanK);
                    result.appendChild(selectNitrogen);
                    result.appendChild(selectKalium);
                    const tambahanA = document.querySelector(".tambahanA");
                    const tambahanB = document.querySelector(".tambahanB");
                    const selectNit = document.querySelector(".selectNit");
                    const selectKal = document.querySelector(".selectKal");
                    selectNit.addEventListener("change", () => {
                        if (selectNit.value == "Urea") {
                            tambahanA.innerHTML = `<strong> Urea </strong>  sebesar <strong> ${tambahUrea} </strong>`;
                        } else if (selectNit.value == "Ammonium Sulfate") {
                            tambahanA.innerHTML = `<strong> Ammonium Sulfate </strong> sebesar <strong> ${tambahZA} </strong>`;
                        } else if (selectNit.value == "Ammonium Nitrate") {
                            tambahanA.innerHTML = `<strong> Ammonium Nitrate </strong> sebesar <strong> ${tambahAN} </strong>`;
                        }
                    });
                    selectKal.addEventListener("change", () => {
                        if (selectKal.value == "KCL") {
                            tambahanB.innerHTML = `<strong> KCL </strong> sebesar <strong>  ${tambahKCL} </strong>`;
                        } else if (selectKal.value == "Kalium Sulfate") {
                            tambahanB.innerHTML = `<strong> ZK </strong> sebesar <strong> ${tambahZK} </strong>`;
                        }
                    });
                } else if (totalTambahanK == 0) {
                    result.innerHTML = tanpaNPK("Nitrogen", totalTambahanN, "P2O5", totalTambahanP);
                    result.appendChild(selectNitrogen);
                    result.appendChild(selectFosfor);
                    const tambahanA = document.querySelector(".tambahanA");
                    const tambahanB = document.querySelector(".tambahanB");
                    const selectNit = document.querySelector(".selectNit");
                    const selectFos = document.querySelector(".selectFos");
                    selectNit.addEventListener("change", () => {
                        if (selectNit.value == "Urea") {
                            tambahanA.innerHTML = `<strong> Urea </strong>  sebesar <strong> ${tambahUrea} </strong>`;
                        } else if (selectNit.value == "Ammonium Sulfate") {
                            tambahanA.innerHTML = `<strong> Ammonium Sulfate </strong> sebesar <strong> ${tambahZA} </strong>`;
                        } else if (selectNit.value == "Ammonium Nitrate") {
                            tambahanA.innerHTML = `<strong> Ammonium Nitrate </strong> sebesar <strong> ${tambahAN} </strong>`;
                        }
                    });
                    selectFos.addEventListener("change", () => {
                        if (selectFos.value == "TSP") {
                            tambahanB.innerHTML = `<strong> TSP </strong>  sebesar <strong> ${tambahTSP} </strong>`;
                        } else if (selectFos.value == "SP36") {
                            tambahanB.innerHTML = `<strong> SP36 </strong> sebesar <strong> ${tambahSP} </strong>`;
                        }
                    });
                }
            }
        }
    }
});

function tercukupi() {
    return `<p> Kebutuhan hara lahan anda telah tercukupi.Anda tidak perlu menambah pupuk. </p>`;
}