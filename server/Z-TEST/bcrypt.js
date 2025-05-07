import bcrypt from 'bcrypt'; // lub import bcrypt from 'bcrypt'; jeśli kontener wspiera ES modules bezpośrednio w replu
// Sprawdź, czy import działa

// Spróbuj zahashować coś
bcrypt.hash('test123', 10).then(hash => {
  console.log('Generated hash:', hash);
  // Spróbuj porównać z wygenerowanym hashem
  return bcrypt.compare('test123', hash);
}).then(match => {
  console.log('Compare 1 (should be true):', match);
  // Spróbuj porównać ze złym hasłem
  return bcrypt.compare('wrong_password', hash);
}).then(match => {
   console.log('Compare 2 (should be false):', match);
   // Spróbuj porównać z hashem wziętym z bazy, który powoduje problem (jeśli znasz jego wartość)
   // const problematicHash = "..." // wklej hash z bazy
   // return bcrypt.compare('password', problematicHash);
}).catch(err => {
  console.error('Manual bcrypt test failed:', err);
});

// Spróbuj także wywołać bcrypt.compare z null, undefined, pustym stringiem
// bcrypt.compare('password', null).catch(err => console.error('Compare with null hash failed:', err));
// bcrypt.compare('password', undefined).catch(err => console.error('Compare with undefined hash failed:', err));
// bcrypt.compare('password', '').catch(err => console.error('Compare with empty string hash failed:', err));