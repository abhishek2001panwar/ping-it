"""
Simple SVG-based icons for PWA
You can replace these with actual PNG images later
"""

# Create a simple SVG icon that can be used as placeholder
svg_192 = '''
<svg width="192" height="192" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="192" height="192" rx="40" fill="url(#grad)"/>
  <circle cx="96" cy="70" r="25" fill="white" opacity="0.9"/>
  <path d="M 96 100 L 96 150" stroke="white" stroke-width="6" stroke-linecap="round" opacity="0.9"/>
  <circle cx="96" cy="155" r="5" fill="white" opacity="0.9"/>
</svg>
'''

svg_512 = '''
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="110" fill="url(#grad)"/>
  <circle cx="256" cy="190" r="70" fill="white" opacity="0.9"/>
  <path d="M 256 270 L 256 400" stroke="white" stroke-width="18" stroke-linecap="round" opacity="0.9"/>
  <circle cx="256" cy="420" r="15" fill="white" opacity="0.9"/>
</svg>
'''

# Write the SVG files
with open('public/icon-192.svg', 'w') as f:
    f.write(svg_192)

with open('public/icon-512.svg', 'w') as f:
    f.write(svg_512)

print("✓ SVG icons created successfully!")
print("\nTo convert to PNG (install Pillow first: pip install pillow cairosvg):")
print("You can use online tools like https://cloudconvert.com/svg-to-png")
print("\nOr use this script after installing cairosvg:")
print("  import cairosvg")
print("  cairosvg.svg2png(url='public/icon-192.svg', write_to='public/icon-192.png')")
print("  cairosvg.svg2png(url='public/icon-512.svg', write_to='public/icon-512.png')")
