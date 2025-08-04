# Fix links in HTML files
$files = Get-ChildItem -Path . -Filter "*.html" -Recurse

foreach ($file in $files) {
    Write-Host "Processing: $($file.Name)"
    
    $content = Get-Content $file.FullName -Raw
    
    # Fix src="/assets/ to src="assets/
    $content = $content -replace 'src="/assets/', 'src="assets/'
    
    # Fix href="/ to href="
    $content = $content -replace 'href="/', 'href="'
    
    # Write back to file
    Set-Content -Path $file.FullName -Value $content -NoNewline
}

Write-Host "All links fixed!" 