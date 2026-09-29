#!/usr/bin/env bash
# デモ用リポジトリを 1 本だけ用意する。
# 前回のデモ用リポジトリ（GitHub・手元・Claude Code の記録・開発サーバー）を全部消してから、
# テンプレートから mini-shop-demo-live を作り直し、issue を登録して手元に取得する。
# 毎回作り直すので、issue 番号は必ず #1 から始まる。
#
# 使い方: scripts/new-demo-repo.sh
set -euo pipefail

TEMPLATE="HasutoSasaki/mini-shop-demo"
LIVE_NAME="mini-shop-demo-live"
ISSUES=(1 2 3)

script_dir="$(cd "$(dirname "$0")" && pwd)"
owner="$(gh api user -q .login)"
repo="${owner}/${LIVE_NAME}"

# 前回分をすべて消す（確認の入力あり）
"${script_dir}/cleanup-demo-repos.sh" --yes

if gh repo view "$repo" >/dev/null 2>&1; then
  echo "まだ残っています: $repo" >&2
  exit 1
fi

gh repo create "$repo" --template "$TEMPLATE" --public

# テンプレートからのコピーが終わるまで待つ
until gh api "repos/${repo}/commits" >/dev/null 2>&1; do sleep 2; done

for n in "${ISSUES[@]}"; do
  title="$(gh issue view "$n" --repo "$TEMPLATE" --json title -q .title)"
  body="$(gh issue view "$n" --repo "$TEMPLATE" --json body -q .body)"
  gh issue create --repo "$repo" --title "$title" --body "$body"
done

ghq get "$repo"
dir="$(ghq root)/github.com/${repo}"
(cd "$dir" && pnpm install)

echo
echo "作成しました: https://github.com/${repo}"
echo "フォルダ: $dir"
