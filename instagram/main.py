# -*- coding: utf-8 -*-
"""
main.py — Publication Instagram 100% automatique, en UNE commande.

Enchaîne :
  1) prepare  : choisit le meilleur article non posté, génère la copy IA + les slides
  2) git push : met les images en ligne (l'API officielle les télécharge par URL)
  3) publish  : poste le carrousel et met à jour posted.json

Charge tout seul les clés depuis instagram/.env — aucun `export` ni `source` requis.

Lancement (depuis n'importe où) :
    /chemin/vers/instagram/.venv/bin/python /chemin/vers/instagram/main.py

Ou, depuis instagram/ avec le venv activé :
    python main.py

Options :
    --no-git     : ne pousse pas sur GitHub (utile pour un test local du rendu)
    --wait N     : secondes d'attente après le push (défaut 20)
"""
import argparse, os, pathlib, subprocess, sys, time

ROOT = pathlib.Path(__file__).resolve().parent       # .../instagram
REPO = ROOT.parent                                    # racine du dépôt git
sys.path.insert(0, str(ROOT))

def load_env(path: pathlib.Path):
    """Charge un .env (lignes KEY=val ou export KEY="val") dans os.environ."""
    if not path.exists():
        return
    for raw in path.read_text("utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        line = line.removeprefix("export ").strip()
        if "=" not in line:
            continue
        key, val = line.split("=", 1)
        val = val.strip().strip('"').strip("'")
        os.environ.setdefault(key.strip(), val)

def git(*args) -> int:
    """Lance une commande git dans le dépôt, sans planter le script en cas d'échec."""
    print("   $ git", *args)
    return subprocess.run(["git", "-C", str(REPO), *args]).returncode

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--no-git", action="store_true", help="ne pas pousser sur GitHub")
    ap.add_argument("--wait", type=int, default=20, help="attente (s) après le push")
    args = ap.parse_args()

    load_env(ROOT / ".env")

    import run  # réutilise la logique existante (prepare / publish)

    # 1) Génération
    print("\n=== 1/3 · Génération du carrousel ===")
    run.cmd_prepare(None)

    manifest = run._load(run.MANIFEST, {"empty": True})
    if manifest.get("empty"):
        print("\n🟢 Rien de nouveau à publier aujourd'hui. Fin.")
        return

    # 2) Mise en ligne des images
    if args.no_git:
        print("\n=== 2/3 · Push GitHub IGNORÉ (--no-git) ===")
        print("⚠️  Sans push, l'API ne pourra pas accéder aux images.")
        return
    print("\n=== 2/3 · Mise en ligne des images (git push) ===")
    git("add", "instagram/out")
    git("commit", "-m", f"ig: visuels {manifest['title'][:60]}")
    if git("push") != 0:
        sys.exit("❌ Le push a échoué (auth GitHub ? token ?). Publication annulée.")
    print(f"   ⏳ Attente {args.wait}s le temps que les images soient servies...")
    time.sleep(args.wait)

    # 3) Publication
    print("\n=== 3/3 · Publication sur Instagram ===")
    run.cmd_publish(None)

    # Sauvegarde de l'état
    git("add", "instagram/posted.json")
    git("commit", "-m", "ig: maj posted.json")
    git("push")
    print("\n🎉 Terminé.")

if __name__ == "__main__":
    main()
