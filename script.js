class Book {
    constructor(title, author, genre) {
        this.title = title;
        this.author = author;
        this.genre = genre;
    }

    describe() {
        return `The book ${this.title} was written by ${this.author} and is considered ${this.genre}.`;
    }
}

class BookList {
    constructor(name) {
        this.name = name;
        this.books = [];
    }

    addBook(book) {
        if (book instanceof Book) {
            this.books.push(book);
        } else {
            throw new Error(`You can only add an instance of Book. Argument is not a book: ${book}.`);
        }
    }

    describe() {
        return `${this.name} contains ${this.books.length} books.`;
    }
}

class Menu {
    constructor() {
        this.lists = [];
        this.selectedList = null;
    }

    start() {
        let selection = this.showMainMenuOptions();
        while (selection !== '0') {
            switch (selection) {
                case '1':
                    this.createBookList();
                    break;
                case '2':
                    this.viewBookList();
                    break;
                case '3':
                    this.deleteBookList();
                    break;
                case '4':
                    this.displayBookLists();
                    break;
                default:
                    alert('Invalid selection.');
            }
            selection = this.showMainMenuOptions();
        }
        alert('Goodbye!');
    }

    showMainMenuOptions() {
        return prompt(`
            0) Exit
            1) Create New Book List
            2) View Book List
            3) Delete Book List
            4) Display All Book Lists
        `);
    }

    showBookMenuOptions(listInfo) {
        return `
        0) Back
        1) Create Book
        2) Delete Book
        ----------------
        ${listInfo}
        `;
    }

    displayBookLists() {
        let listString = '';
        this.lists.forEach((list, index) => {
            listString += `${index}: ${list.name}\n`;
        });
        alert(listString);
    }

    createBookList() {
        let name = prompt('Enter name for new list:');
        this.lists.push(new BookList(name));
    }

    viewBookList() {
        let index = prompt('Enter the index of the list you wish to view:');
        if (index > -1 && index < this.lists.length) {
            this.selectedList = this.lists[index];
            let description = `List Name: ${this.selectedList.name}\n`;
            this.selectedList.books.forEach((book, i) => {
                description += `${i} ${book.title} - ${book.author}\n`;
            });

            let selection = this.showBookMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createBook();
                    break;
                case '2':
                    this.deleteBook();
                    break;
                default:
                    alert('Invalid selection.');
            }
        }
    }

    deleteBookList() {
        let index = prompt('Enter the index of the list you wish to delete:');
        if (index > -1 && index < this.lists.length) {
            this.lists.splice(index, 1);
        } else {
            alert('Invalid information.');
        }
    }

    createBook() {
        let title = prompt('Enter title of book:');
        let author = prompt('Enter author of book:');
        let genre = prompt('Enter genre of book:');
        this.selectedList.addBook(new Book(title, author, genre));
    }

    deleteBook() {
        let index = prompt('Enter the index of the book you wish to delete:');
        if (index > -1 && index < this.selectedList.books.length) {
            this.selectedList.books.splice(index, 1);
        } else {
            alert('Invalid information.');
        }
    }
}

let menu = new Menu();
menu.start();
