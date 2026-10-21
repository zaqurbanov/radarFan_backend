# 084 — Balans: tez göstər, amma yoxla

**Status:** [ ] · **Faza:** 6 · **Əvvəl bitməli:** 083, 049

## Qısaca
Balansı hər dəfə jurnalın cəmi ilə hesablama. Ayrıca saxla, amma vaxtaşırı jurnalla müqayisə et.

## Niyə lazımdır?
- XP başlıqda **hər ekranda** görünür. 10 000 sətirlik jurnalı hər dəfə toplamaq bahadır.
- Sənəd: balans keşi jurnal əsasında yenilənir və fon işi ilə yoxlanır.

## Yeni cədvəl: `user_balances`
| Sütun | İzah |
|---|---|
| user_id | |
| tenant_id | |
| xp | XP balansı |
| coins | coin balansı (086) |
| updated_at | |

**CHECK qaydası:** `coins >= 0`. Mənfi coin = bug. Baza özü bloklasın.

## Nə edəcəksən
1. Jurnala yazanda **eyni tranzaksiyada** balansı da artır. Yalnız jurnal sətri **həqiqətən** yazılıbsa!
2. Fon işi (gündə və ya saatda bir): jurnalın cəmi ≠ balans olan istifadəçiləri tap → logla + xəbərdarlıq + balansı jurnala bərabərləşdir. **Həqiqət həmişə jurnaldadır.**
3. Bütün istifadəçiləri yoxlamaq bahadır. Yalnız son saatlarda dəyişənləri yoxla.

## Hazır olduğunu necə yoxlayarsan
- [ ] Balansı əl ilə pozub (SQL ilə) fon işini işlədəndə düzəlir və logda xəbərdarlıq var.
- [ ] Mənfi coin yazmaq DB xətası verir.
