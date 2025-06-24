#!/bin/bash
# Local CI testing script using act
set -e

echo "🚀 Running local GitHub Actions simulation..."

# Check if act is installed
if ! command -v act &> /dev/null; then
    echo "❌ act is not installed. Please install it first:"
    echo "   macOS: brew install act"
    echo "   Linux: curl -s https://raw.githubusercontent.com/nektos/act/master/install.sh | bash"
    echo "   Windows: winget install nektos.act"
    echo "   Or download from https://github.com/nektos/act/releases"
    exit 1
fi

# Run Deno workflow
echo "🦕 Testing Deno workflow..."
if ! act -W .github/workflows/javascript.yml -j deno; then
    echo "❌ Deno workflow failed."
    exit 1
fi

# Run Rust workflow if Cargo.toml exists
if [ -f "Cargo.toml" ]; then
    echo "🦀 Testing Rust workflow..."
    if ! act -W .github/workflows/rust.yml; then
        echo "❌ Rust workflow failed."
        exit 1
    fi
else
    echo "⏭️  Skipping Rust workflow (no Cargo.toml found)"
fi

echo "✅ All local CI tests passed!"