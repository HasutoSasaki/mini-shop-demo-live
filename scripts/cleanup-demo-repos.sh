#!/usr/bin/env bash
# デモ用に作ったリポジトリ（mini-shop-demo-*）を、GitHub・手元・Claude Code の記録まで含めて全部消す。
# テンプレート本体（mini-shop-demo）には触らない。
#
# 使い方:
#   scripts/cleanup-demo-repos.sh          消す対象を表示するだけ（何も消さない）
#   scripts/cleanup-demo-repos.sh --yes    表示したあと、確認の入力を求めてから消す
#
# 消すもの:
#   1. GitHub のリポジトリ  <owner>/mini-shop-demo-*
#   2. 手元のフォルダ        $(ghq root)/github.com/<owner>/mini-shop-demo-*
#   3. Claude Code のセッション記録  ~/.claude/projects/<上のフォルダのパス>
#   4. 上のフォルダから起動している開発サーバー（ポート 5173 など）
#
# GitHub のリポジトリ削除には delete_repo 権限が必要:
#   gh auth refresh -h github.com -s delete_repo
set -euo pipefail

TEMPLATE_NAME="mini-shop-demo"
PREFIX="${TEMPLATE_NAME}-"

mode="${1:-}"
owner="$(gh api user -q .login)"
ghq_root="$(ghq root)"
base_dir="${ghq_root}/github.com/${owner}"
claude_projects="${HOME}/.claude/projects"

if [[ -z "$owner" || -z "$ghq_root" ]]; then
  echo "owner または ghq root が取得できません" >&2
  exit 1
fi

# 1. GitHub のリポジトリ
remote_repos=()
while IFS= read -r name; do
  [[ "$name" == "${PREFIX}"* ]] && remote_repos+=("${owner}/${name}")
done < <(gh repo list "$owner" --limit 1000 --json name -q '.[].name')

# 2. 手元のフォルダ
local_dirs=()
for d in "${base_dir}/${PREFIX}"*; do
  [[ -d "$d" ]] && local_dirs+=("$d")
done

# 3. Claude Code のセッション記録（パスの / と . を - に置き換えた名前）
encode() { printf '%s' "$1" | sed 's#[/.]#-#g'; }
claude_dirs=()
for d in "${claude_projects}/$(encode "${base_dir}/${PREFIX}")"*; do
  [[ -d "$d" ]] && claude_dirs+=("$d")
done

# 4. 上のフォルダから起動している開発サーバー
pids=()
while IFS= read -r pid; do
  [[ -z "$pid" ]] && continue
  cwd="$(lsof -a -p "$pid" -d cwd -Fn 2>/dev/null | sed -n 's/^n//p')"
  [[ "$cwd" == "${base_dir}/${PREFIX}"* ]] && pids+=("$pid")
done < <(lsof -nP -iTCP -sTCP:LISTEN -t 2>/dev/null | sort -u)

print_list() {
  local label="$1"; shift
  echo "■ ${label}"
  if [[ $# -eq 0 ]]; then echo "  （なし）"; else printf '  %s\n' "$@"; fi
}

print_list "GitHub のリポジトリ" "${remote_repos[@]+"${remote_repos[@]}"}"
print_list "手元のフォルダ" "${local_dirs[@]+"${local_dirs[@]}"}"
print_list "Claude Code のセッション記録" "${claude_dirs[@]+"${claude_dirs[@]}"}"
if [[ ${#pids[@]} -gt 0 ]]; then
  echo "■ 停止する開発サーバー"
  for pid in "${pids[@]}"; do ps -o pid=,command= -p "$pid" | sed 's/^/  /'; done
else
  print_list "停止する開発サーバー"
fi

total=$(( ${#remote_repos[@]} + ${#local_dirs[@]} + ${#claude_dirs[@]} + ${#pids[@]} ))
if [[ $total -eq 0 ]]; then
  echo "消すものはありません"
  exit 0
fi

if [[ "$mode" != "--yes" ]]; then
  echo
  echo "表示だけしました。消すときは --yes を付けて実行してください。"
  exit 0
fi

echo
read -r -p "上のものをすべて削除します。元に戻せません。よければ delete と入力: " answer
if [[ "$answer" != "delete" ]]; then
  echo "中止しました"
  exit 1
fi

for pid in "${pids[@]+"${pids[@]}"}"; do
  kill "$pid" 2>/dev/null || true
done

for repo in "${remote_repos[@]+"${remote_repos[@]}"}"; do
  [[ "$repo" == "${owner}/${TEMPLATE_NAME}" ]] && continue
  gh repo delete "$repo" --yes
done

for d in "${local_dirs[@]+"${local_dirs[@]}"}" "${claude_dirs[@]+"${claude_dirs[@]}"}"; do
  case "$d" in
    "${base_dir}/${PREFIX}"?*|"${claude_projects}/"?*) rm -rf "$d" ;;
    *) echo "想定外のパスなので飛ばします: $d" >&2 ;;
  esac
done

echo "削除しました"
