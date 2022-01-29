export function convertMagicToIcon(magic) {
  let magicIcons = ''
  magic.forEach(m => {
    switch (m) {
      case 'mountain':
        magicIcons += '<i class="fas fa-mountain"></i>'
        break;
      case 'air':
        magicIcons += '<i class="fas fa-wind"></i>'
        break;
      case 'water':
        magicIcons += '<i class="fas fa-tint"></i>'
        break;
      case 'fire':
        magicIcons += '<i class="fas fa-fire-alt"></i>'
        break;
    }
  })

  return magicIcons
}