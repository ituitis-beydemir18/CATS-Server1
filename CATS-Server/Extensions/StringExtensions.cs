using System.Globalization;
using System.Linq;
using System.Text;


namespace CATS_Server
{
    public static class StringExtensions
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="s"></param>
        /// <returns></returns>
        public static string ToSnakeCase(this string str)
        {
            return string.Concat(str.Select((x, i) => i > 0 && char.IsUpper(x) ? "_" + x.ToString() : x.ToString())).ToUpperInvariant();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="s"></param>
        /// <returns></returns>
        public static string RemoveDiacritics(this string s)
        {
            s = string.Join("", s?.Normalize(NormalizationForm.FormKD).Where(c => char.GetUnicodeCategory(c) != UnicodeCategory.NonSpacingMark));
            s = s.Replace('ı', 'i');
            return s;
        }
    }
}
