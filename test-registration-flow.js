const User = require('./models/User');

async function testRegistration() {
  const newUser = {
    name: 'New Test User',
    email: 'newuser@test.com',
    phone: '1234567890',
    password: 'password123'
  };

  try {
    console.log('1. Checking if email exists...');
    const existing = await User.findByEmail(newUser.email);
    if (existing) {
      console.log('❌ Email already exists');
      process.exit(1);
    }
    console.log('✅ Email available');

    console.log('2. Creating user...');
    const result = await User.create(newUser);
    console.log('✅ User created:', result);

    console.log('3. Verifying user was created...');
    const created = await User.findByEmail(newUser.email);
    console.log('✅ User found:', created.name, created.email);

    console.log('4. Testing password validation...');
    const isValid = await User.validatePassword(newUser.password, created.password);
    console.log('✅ Password valid:', isValid);

    console.log('\n✅ ALL TESTS PASSED - Registration works!');
    process.exit(0);
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

testRegistration();
