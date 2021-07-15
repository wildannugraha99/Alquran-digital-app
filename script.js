    fetch('https://al-quran-8d642.firebaseio.com/data.json?print=pretty')
    .then(response => response.json())
    .then(function jilid (respon) {
        
        const listSurah = document.createElement('h3')
        listSurah.innerText = 'List Surah'
        const rootHtml = document.querySelector('.root-html')
        rootHtml.append(listSurah)

        const data = respon
        data.forEach(val => {
            const namaSurah = document.createElement('h4')
            namaSurah.classList.add('nama')
            namaSurah.innerText = val.nama + " ( " + val.asma + " )"
            const artiSurah = document.createElement('p')
            artiSurah.innerText = "Arti: " + val.arti
            const ayatSurah = document.createElement('p')
            ayatSurah.innerText = "Ayat: " + val.ayat + " ayat"

            const audioSurah = document.createElement('div')
            audioSurah.classList.add('audio-surah')
            audioSurah.innerHTML=`<audio controls>
           <source src="${val.audio}" type="audio/ogg">
            Your browser does not support the audio element.
          </audio>`

            const titleSurah = document.createElement('div')
            titleSurah.classList.add('ket-surah')
            titleSurah.append(namaSurah, artiSurah, ayatSurah,audioSurah)

            const btnKetSurah = document.createElement('div')
            btnKetSurah.innerHTML = `<button value="${val.nomor}" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn-ketSurah">
                Keterangan Surah</button>`

            const btnTeksSurah = document.createElement('div')
            btnTeksSurah.innerHTML = `<button value="${val.nomor}" class="btn-teksSurah">
            Baca Surah</button>`

            const detailSurah = document.createElement('div')
            detailSurah.classList.add('btn-detail-surah')
            detailSurah.append(btnKetSurah, btnTeksSurah)

            const li = document.createElement('li')
            li.classList.add('list-group-item')
            li.classList.add('list-surah')
            li.append(titleSurah, detailSurah)

            const ul = document.querySelector('.list-group')
            ul.append(li)

            const app = document.querySelector('.root-html')
            app.append(ul)
        });
    

        const btnValue = document.querySelectorAll('.btn-ketSurah')
        btnValue.forEach(btnDetail => {

            btnDetail.querySelector('.btn-ketSurah')
            btnDetail.addEventListener('click', function () {

                fetch('https://api.banghasan.com/quran/format/json/surat/' + btnDetail.value)
                    .then(response => response.json())

                    .then(function (ket) {
                       
                        document.querySelector('.modal-body').innerHTML = ""

                        const dataKet = ket.hasil
                        dataKet.forEach(data => {

                            const asmaSurah = document.createElement('h1')
                            asmaSurah.innerText = data.asma

                            const namaSurah = document.createElement('h5')
                            namaSurah.innerText = "(" + data.nama + ")"

                            const detailKet = document.createElement('p')
                            detailKet.innerHTML = `${data.keterangan}`

                            const modalBody = document.querySelector('.modal-body')
                            modalBody.append(asmaSurah, namaSurah, detailKet)
                        });

                    })
            })
        });

        const btnValueTeks = document.querySelectorAll('.btn-teksSurah')
        btnValueTeks.forEach(btnTeks => {

            btnTeks.querySelector('.btn-teksSurah')
            btnTeks.addEventListener('click', function () {
                const closeBtn = document.createElement('div')
                    closeBtn.innerHTML = `<button type="button" class="back">Kembali</button>`
                    closeBtn.addEventListener('click', function(){
                        document.querySelector('#myUl').innerHTML = ""
                        jilid (respon)
                        closeBtn.innerHTML=""
                        listSurah.innerText =""
                    })

                const rootHtml = document.querySelector('.root-html')
                        rootHtml.append(closeBtn)
                
                    fetch('https://al-quran-8d642.firebaseio.com/surat/'+btnTeks.value +'.json?print=pretty')
                    .then(response => response.json())
                    .then(function(teskSurah){
                        listSurah.innerText =""
                        document.querySelector('#myUl').innerHTML = ""
                        
                        const teksSurahDetail = teskSurah
                        teksSurahDetail.forEach(data =>{
                            const teksAr = document.createElement('h4')
                            teksAr.innerText = data.ar

                            const teksTr = document.createElement('p')
                            teksTr.innerHTML = `${data.tr}`

                            const teksId = document.createElement('p')
                            teksId.innerText = "( "+data.id+" )"

                            
                            const li = document.createElement('li')
                            li.classList.add('list-group-item')
                            li.classList.add('list-teks-surah')
                            li.append(teksAr,teksTr,teksId)

                            const ul = document.querySelector('.list-group')
                            ul.append(li)

                            const app = document.querySelector('.root-html')
                            app.append(ul)
                        })

                        



                    })
                    

            })
        });
        

    })

   

   