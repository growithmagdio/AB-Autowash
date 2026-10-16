$images = @(
  @{ name = 'svc-ppf.webp'; url = 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&h=900&q=85&fm=webp' },
  @{ name = 'svc-polish.webp'; url = 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=1200&h=900&q=85&fm=webp' },
  @{ name = 'svc-interior.webp'; url = 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&h=900&q=85&fm=webp' },
  @{ name = 'svc-headlight.webp'; url = 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&h=900&q=85&fm=webp' },
  @{ name = 'svc-wheels.webp'; url = 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&h=900&q=85&fm=webp' },
  @{ name = 'before.webp'; url = 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1920&h=1080&q=85&fm=webp' },
  @{ name = 'after.webp'; url = 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&h=1080&q=85&fm=webp' },
  @{ name = 'process-bg.webp'; url = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&h=1080&q=85&fm=webp' },
  @{ name = 'og-image.webp'; url = 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&h=630&q=85&fm=webp' }
)

foreach ($item in $images) {
  $file = $item.name
  $link = $item.url
  $dest = "public/images/$file"
  Write-Host "Downloading $file..."
  curl.exe -s -L --max-time 15 -o $dest "$link"
  if (Test-Path $dest) {
    Write-Host "Saved: $file"
  } else {
    Write-Host "Failed: $file"
  }
}
