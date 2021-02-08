const yargs = require('yargs');
const note = require('./note.controller.js');

//customize yargs
yargs.version('1.0.0');

//create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler({ title, body }) {
        note.addNote(title, body);
    }
})

//create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Title for remove',
            demandOption: true,
            type: 'string'
        }
    },
    handler({ title }) {
        note.removeNote(title);
    }
})

//create list command
yargs.command({
    command: 'list',
    describe: 'List a note',
    handler() {
        note.listNotes();
    }
})

//create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        }
    },
    handler({ title }) {
        note.readNote(title);
    }
})

//add, remove, read list
yargs.parse()