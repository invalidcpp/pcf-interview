/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { expect } from 'chai';
import 'mocha';
import update from './update';
import create from '../create/create';
import Locations, { Location, LocationLean } from '../location.model';

describe('Location :: Update', async () => {
  it('The name can be changed', async () => {
    // TODO: Write a suitable test
    const name = 'testLocation';
    const res = await create({ name });

    const newName = 'newTestLocation';
    expect(await update({ id: res._id, name: newName })).to.have.property('name', newName);
  });

  it('Fails gracefully if the id isnt found', async () => {
    const id = 'ddb75eaea925fe43ce6842a4';

    await expect(update({ id })).to.be.rejectedWith(
      `Failed to update Location: No location found with id ${id}`,
    );
  });
});
