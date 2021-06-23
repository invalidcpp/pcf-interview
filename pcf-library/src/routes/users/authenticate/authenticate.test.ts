import { expect } from 'chai';
import 'mocha';
import authenticate from './authenticate';
import Users from '../users.model';
import { UserRole } from '../../../lib/types';

describe('Users :: Authenticate', async () => {
  beforeEach(async () => {
    const u = {
      removed: false,
      system: false,
      username: 'super',
      password: 'super',
      role: 'Super',
    };
    await Users.create(u);
  });

  it('Authenticate succeeds', async () => {
    // TODO: Write a suitable test

    expect(await authenticate({ username: 'super', password: 'super' })).to.have.property(
      'success',
      true,
    );
  });

  it('Fails if the user doesnt exist', async () => {
    // TODO: Write a suitable test
    const errMsg = 'User test_user_123 does not exist';

    expect(
      authenticate({ username: 'test_user_123', password: 'test_user_123' }),
    ).to.be.rejectedWith(errMsg);
  });

  it('Fails if the password is wrong', async () => {
    const errMsg = `Error: Invalid password`;

    expect(authenticate({ username: 'super', password: 'ppp' })).to.be.rejectedWith(errMsg);
  });
});
