// types/article.ts — Types calqués sur la sortie de l'Agent 2 du pipeline Python.

export type Tendance = "Haussière" | "Baissière" | "Neutre" | "Forte Incertitude";

export interface ImpactFinancier {
  actifs_concernes: string[];
  tendance_marche: Tendance;
  explication_impact: string;
}

export interface AnalyseCritique {
  piege_psychologique: string;
  ce_que_le_marche_oublie: string;
}

export interface RadarFractal {
  volatilite_attendue: number;
  risque_systemique: number;
  fiabilite_information: number;
  horizon_impact: string;
}

export interface ArticleMeta {
  source?: string;
  lien_source?: string;
  date_article?: string;
  score_composite?: number;
  est_nouveau?: boolean;
}

export interface Article {
  titre_newsletter: string;
  synthese_flash: string;
  contexte_macro_micro: string;
  mecanique_de_l_evenement: string;
  impact_financier: ImpactFinancier;
  analyse_critique_et_biais: AnalyseCritique;
  radar_fractal: RadarFractal;
  catalyseur_a_surveiller: string;
  disclaimer: string;
  _meta?: ArticleMeta;
}

export interface NewsletterData {
  articles: Article[];
  derniere_mise_a_jour?: string;
}
