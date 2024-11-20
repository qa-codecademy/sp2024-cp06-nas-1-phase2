namespace Common.Modules
{
    public static class DateParser
    {
        public static DateTime? ParseDate(string dateString)
        {
            if (DateTime.TryParse(dateString, out var parsedDate))
            {
                return parsedDate;
            }
            return null;
        }
    }
}
