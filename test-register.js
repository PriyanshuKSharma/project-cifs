const User = require('./models/User');

async function testRegister() {
  try {
    console.log('Testing user registration...');
    
    const testUser = {
      name: 'Test User',
      email: 'testuser@example.com',
      phone: '9876543210',
      password: 'test123'
    };
    
    // Check if user exists
    const existing = await User.findByEmail(testUser.email);
    if (existing) {
      console.log('✅ User already exists:', existing.email);
      
      // Test login
      const isValid = await User.validatePassword(testUser.password, existing.password);
      console.log('✅ Password validation:', isValid ? 'SUCCESS' : 'FAILED');
    } else {
      // Create user
      const result = await User.create(testUser);
      console.log('✅ User created successfully!');
      console.log('Result:', result);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

testRegister();
