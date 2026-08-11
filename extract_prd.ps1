Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead('PRD_BRMP_DIY.docx')
$entries = $zip.Entries | Where-Object { $_.FullName -eq 'word/document.xml' }
$stream = $entries[0].Open()
$reader = New-Object System.IO.StreamReader($stream)
$content = $reader.ReadToEnd()
$reader.Close()
$zip.Dispose()
# Strip XML tags to get plain text
$text = $content -replace '<[^>]+>', ' '
$text = $text -replace '\s+', ' '
$text | Out-File -FilePath 'prd_content.txt' -Encoding UTF8
Write-Host "Done"
