var request = require('supertest')('http://localhost:8080');

describe('Sample test', () => {
  it('should return true', () => {
    expect(2).toBe(2);
  })
})

describe('Server testing', () => {
  it('should run get request on server', () => {
    request.get('/')
      .expect(200)
      .end((err, res) => {
        if (err) {
          throw err;
        }
      });
  })
})
