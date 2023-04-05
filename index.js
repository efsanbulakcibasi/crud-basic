var Filter = {
    Elements: {
        textArea: document.getElementById("input"),
        postArea: document.getElementById("posts"),
        buton: document.getElementById("buton"),
        emptyValue: document.getElementById("empty-value")
    },

    Status: {
        posts: [],
    },

    Acitons: {
        //id ya da başka bir ekleme yapmadığımı için localstroge son veriyi kaydeder.
        init: () => {
            if (localStorage.getItem("post")) {
                var localStrgData = JSON.parse(localStorage.getItem("post")) || [];
                Filter.Status.posts = localStrgData;
                Filter.Acitons.appendToHtml();
            }
        },
        getValue: () => {
            var value = Filter.Elements.textArea.value;
            if (value === "") {
                Filter.Elements.emptyValue.innerText = "Lütfen bir değer giriniz."
            }
            else{
                Filter.Elements.emptyValue.innerText ="";
                var inputValue = Filter.Elements.textArea.value;
                var post = {inputValue};
                Filter.Status.posts.push(post);
                localStorage.setItem("post", JSON.stringify(Filter.Status.posts));
                Filter.Acitons.resetInput();
                Filter.Acitons.appendToHtml()
            }
        },

        appendToHtml: () => {
            Filter.Elements.postArea.innerHTML = "";
            var posts = Filter.Status.posts;
            for (let i = 0; i < posts.length; i++) {
                var post = posts[i];
                var postHtml =
                "<div class='c-item-01'>" +
                "<p class='c-item-01-A'>" +post.inputValue + "</p>" +
                "<span class='c-item-01-B'>" +
                "<i onclick='Filter.Acitons.editPerson("+i+")' class='fas fa-edit'>" + "</i>" +
                "<i onclick='Filter.Acitons.deletePerson("+i+")' class='fas fa-trash-alt'>" + "</i>" +
                 "</span>"
                "</div>"
                Filter.Elements.postArea.innerHTML +=postHtml;
            }
        },

        resetInput: () => {
            Filter.Elements.textArea.value =""
        },

        editPerson: (personIdex) => {
            debugger
            var textValue = Filter.Status.posts[personIdex];
            Filter.Elements.textArea.value = textValue.inputValue;
            Filter.Elements.buton.innerText = "Düzenle";
            Filter.Elements.buton.setAttribute("onclick", 'Filter.Acitons.saveEditPerson('+personIdex+')')

        },
        saveEditPerson: (personIdex) => {
            var inputValue = Filter.Elements.textArea.value;
            var post = {inputValue};
            Filter.Status.posts[personIdex] = post;
            localStorage.setItem("post", JSON.stringify(Filter.Status.posts[personIdex]))
            Filter.Acitons.appendToHtml();
            Filter.Acitons.resetInput();
            Filter.Elements.buton.innerText = "Ekle";
            Filter.Elements.buton.setAttribute("onclick",'Filter.Acitons.getValue()')
        },

        deletePerson: (personIdex) => {
            debugger
            Filter.Status.posts.splice(personIdex, 1);
            localStorage.setItem("post", JSON.stringify(Filter.Status.posts))
            Filter.Acitons.appendToHtml();
        }
    }
};

Filter.Acitons.init();