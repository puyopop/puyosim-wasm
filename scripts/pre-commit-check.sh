#!/bin/bash
# Pre-commit checks script
set -e

echo "🧪 Running pre-commit checks..."

# Format check
echo "📝 Checking formatting..."
if ! deno fmt --check; then
    echo "❌ Format check failed. Run 'deno fmt' to fix."
    exit 1
fi

# Lint check
echo "🔍 Running linter..."
if ! deno lint; then
    echo "❌ Lint check failed."
    exit 1
fi

# Type check TypeScript files
echo "🔧 Type checking..."
if find . -name "*.ts" -not -path "./node_modules/*" -not -path "./.git/*" | head -1 | grep -q .; then
    if ! find . -name "*.ts" -not -path "./node_modules/*" -not -path "./.git/*" -exec deno check {} +; then
        echo "❌ Type check failed."
        exit 1
    fi
else
    echo "No TypeScript files found, skipping type check"
fi

# Run tests
echo "🧪 Running tests..."
if [ -f "tools/run-tests.sh" ]; then
    chmod +x tools/run-tests.sh
    if ! ./tools/run-tests.sh; then
        echo "❌ Tests failed."
        exit 1
    fi
elif find . -name "*.test.js" -o -name "*.test.ts" | head -1 | grep -q .; then
    if ! deno test --allow-all; then
        echo "❌ Tests failed."
        exit 1
    fi
else
    echo "No test files found, skipping tests"
fi

echo "✅ All pre-commit checks passed!"