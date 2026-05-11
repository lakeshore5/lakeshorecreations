#!/bin/bash

# Batch Image Compression Script for lakeshore5-Website
# Compresses all WebP images over 500KB to ~80% quality
# Requires: brew install webp

echo "🖼️  Image Compression Script for lakeshore5-Website"
echo "=================================================="

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo "❌ cwebp not found. Install it with: brew install webp"
    exit 1
fi

# Set size threshold (500KB = 512000 bytes)
THRESHOLD=512000
QUALITY=80
BACKUP_DIR="builds_backup_$(date +%Y%m%d_%H%M%S)"

# Count images to process
LARGE_IMAGES=$(find builds -name "*.webp" -size +${THRESHOLD}c 2>/dev/null)
COUNT=$(echo "$LARGE_IMAGES" | grep -c "webp" || echo "0")

if [ "$COUNT" -eq 0 ]; then
    echo "✅ No images over 500KB found. All images are optimized!"
    exit 0
fi

echo "📊 Found $COUNT images over 500KB"
echo ""

# Ask for confirmation
read -p "Create backup before compression? (y/n): " BACKUP_CHOICE

if [ "$BACKUP_CHOICE" = "y" ] || [ "$BACKUP_CHOICE" = "Y" ]; then
    echo "📁 Creating backup in $BACKUP_DIR..."
    mkdir -p "$BACKUP_DIR"
    cp -R builds "$BACKUP_DIR/"
    echo "✅ Backup created"
fi

echo ""
echo "🔄 Starting compression (Quality: $QUALITY%)..."
echo ""

# Track statistics
TOTAL_BEFORE=0
TOTAL_AFTER=0
PROCESSED=0

# Process each large image
find builds -name "*.webp" -size +${THRESHOLD}c | while read -r file; do
    # Get original size
    ORIGINAL_SIZE=$(stat -f%z "$file")
    ORIGINAL_SIZE_KB=$((ORIGINAL_SIZE / 1024))
    
    # Create temp file for compression
    TEMP_FILE="${file}.tmp"
    
    # Compress with cwebp
    if cwebp -q $QUALITY "$file" -o "$TEMP_FILE" 2>/dev/null; then
        NEW_SIZE=$(stat -f%z "$TEMP_FILE")
        NEW_SIZE_KB=$((NEW_SIZE / 1024))
        
        # Only replace if new file is smaller
        if [ "$NEW_SIZE" -lt "$ORIGINAL_SIZE" ]; then
            mv "$TEMP_FILE" "$file"
            SAVINGS=$((ORIGINAL_SIZE_KB - NEW_SIZE_KB))
            PERCENT=$((100 - (NEW_SIZE * 100 / ORIGINAL_SIZE)))
            echo "✅ $(basename "$file"): ${ORIGINAL_SIZE_KB}KB → ${NEW_SIZE_KB}KB (saved ${SAVINGS}KB, ${PERCENT}%)"
        else
            rm "$TEMP_FILE"
            echo "⏭️  $(basename "$file"): Already optimized (${ORIGINAL_SIZE_KB}KB)"
        fi
    else
        echo "❌ Failed to compress: $file"
        rm -f "$TEMP_FILE"
    fi
done

echo ""
echo "✨ Compression complete!"
echo ""

# Show summary
echo "📊 Summary:"
echo "==========="
find builds -name "*.webp" -size +${THRESHOLD}c | wc -l | xargs echo "   Remaining large images (>500KB):"
du -sh builds | awk '{print "   Total builds folder size: " $1}'

echo ""
echo "💡 Tip: Run this script again after adding new images"
