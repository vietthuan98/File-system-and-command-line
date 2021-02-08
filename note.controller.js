const fs = require('fs');
const chalk = require('chalk');

const FILE_NAME = 'notes.json'

//ADD
const addNote = (title, body) => {
    const notes = loadNotes();
    const hasDuplicatedNote = notes.some((note) => note.title === title);
    if (hasDuplicatedNote) {
        console.log(chalk.yellow.inverse('Note title taken'));
        return;
    }
    notes.push({
        title,
        body
    })
    saveNotes(notes);
    console.log(chalk.green.inverse('New note added'));
}

//REMOVE
const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter(note => note.title !== title);
    if (notes.length === notesToKeep.length) {
        console.log(chalk.red.inverse('Not found note'));
        return;
    }
    saveNotes(notesToKeep);
    console.log(chalk.green.inverse(`${title} has been removed`));
}

//LIST
const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.italic.inverse('Your notes:'));
    notes.forEach((note, i) => console.log(`${++i}.${note.title}`));
}

//READ
const readNote = (title) => {
    const notes = loadNotes();
    const foundNote = notes.find(note => note.title === title);
    if (!foundNote) {
        console.log(chalk.red.inverse(`${title} does not exist`));
        return;
    }
    console.log(`Title: ${title}`);
    console.log(`Body: ${foundNote.body}`);
}

const saveNotes = (notes) => {
    const dataString = JSON.stringify(notes);
    fs.writeFileSync(FILE_NAME, dataString);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync(FILE_NAME);
        const dataString = dataBuffer.toString();
        const data = JSON.parse(dataString);
        return data;
    } catch (e) {
        return [];
    }
}

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
}