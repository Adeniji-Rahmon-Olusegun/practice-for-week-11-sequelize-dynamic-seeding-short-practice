'use strict';

const { where } = require('sequelize');
const { Musician, Instrument, MusicianInstrument } = require('../models');

const musicianInstruments = [
  {
    musician: { firstName: 'Adam', lastName: 'Appleby' },
    instruments: [{ type: 'piano' }, { type: 'guitar' }]
  },
  {
    musician: { firstName: 'Anton', lastName: 'Martinovic' },
    instruments: [{ type: 'piano' }, { type: 'bass' }]
  },
  {
    musician: { firstName: 'Wilson', lastName: 'Holt' },
    instruments: [{ type: 'cello' }]
  },
  {
    musician: { firstName: 'Marine', lastName: 'Sweet' },
    instruments: [{ type: 'saxophone' }]
  },
  {
    musician: { firstName: 'Georgette', lastName: 'Kubo' },
    instruments: [{ type: 'drums' }, { type: 'trumpet' }, { type: 'saxophone' }]
  },
  {
    musician: { firstName: 'Aurora', lastName: 'Hase' },
    instruments: [{ type: 'violin' }, { type: 'cello' }]
  },
  {
    musician: { firstName: 'Trenton', lastName: 'Lesley' },
    instruments: [{ type: 'piano' }]
  },
  {
    musician: { firstName: 'Camila', lastName: 'Nenci' },
    instruments: [{ type: 'piano' }]
  },
  {
    musician: { firstName: 'Rosemarie', lastName: 'Affini' },
    instruments: [{ type: 'piano' }, { type: 'violin' }]
  },
  {
    musician: { firstName: 'Victoria', lastName: 'Cremonesi' },
    instruments: [{ type: 'violin' }]
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   for (let musicianidx = 0; musicianidx < musicianInstruments.length; musicianidx++) {
    const { musician, instruments } = musicianInstruments[musicianidx];
    const { firstName, lastName } = musician;
    const musicIan = await Musician.findOne({ where: { firstName, lastName}});

    for (let instrumentIdx = 0; instrumentIdx < instruments.length; instrumentIdx++) {
      const instrument = instruments[instrumentIdx];
      const { type } = instrument;
      const instrumenT = await Instrument.findOne({ where: { type }});
      await musicIan.addInstrument(instrumenT);
    }

   }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    for (let musicianidx = 0; musicianidx < musicianInstruments.length; musicianidx++) {
    const { musician, instruments } = musicianInstruments[musicianidx];
    const { firstName, lastName } = musician;
    const musicIan = await Musician.findOne({ where: { firstName, lastName}});

    for (let instrumentIdx = 0; instrumentIdx < instruments.length; instrumentIdx++) {
      const instrument = instruments[instrumentIdx];
      const { type } = instrument;
      const instrumenT = await Instrument.findOne({ where: { type }});

      const musicianId = musicIan.id;
      const instrumentId = instrumenT.id;
      await MusicianInstrument.destroy({ where: { musicianId, instrumentId}});
    }

   }
  }
};
