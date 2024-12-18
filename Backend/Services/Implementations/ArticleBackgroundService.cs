﻿using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Services.Interfaces;

namespace Services.Implementations
{
    public class ArticleBackgroundService : BackgroundService, IArticleBackgroundService
    {
        private readonly IServiceScopeFactory _serviceProvider;
        public ArticleBackgroundService(IServiceScopeFactory serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }
        
        public override Task StartAsync(CancellationToken cancellationToken)
        {
            Console.WriteLine("Article background service is starting...");
            LogInformation("Article background service is starting...");

            return base.StartAsync(cancellationToken);
        }
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            Console.WriteLine("Article background service is starting...");
            LogInformation("Article background service is starting...");

            while (!stoppingToken.IsCancellationRequested)
            {
                Console.WriteLine($"Fetching and processing RSS feeds at: {DateTimeOffset.UtcNow}");
                LogInformation($"Fetching and processing RSS feeds at: {DateTimeOffset.UtcNow}");

                try
                {
                    using var scope = _serviceProvider.CreateScope();
                    var rssFeedService = scope.ServiceProvider.GetRequiredService<IRssFeedService>();
                    await rssFeedService.FetchAndProcessRssFeedsAsync(stoppingToken);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex + "\nAn error occurred while fetching and processing RSS feeds!");
                    LogInformation(ex + "\nAn error occurred while fetching and processing RSS feeds!");
                }

                await Task.Delay(TimeSpan.FromMinutes(5), stoppingToken);
            }

            Console.WriteLine("Article background service is stopping...");
            LogInformation("Article background service is stopping...");
        }
        public override async Task StopAsync(CancellationToken cancellationToken)
        {
            Console.WriteLine("Article background service is stopping...");
            LogInformation("Article background service is stopping...");
            await base.StopAsync(cancellationToken);
        }

        private void LogInformation(string message)
        {
            using var scope = _serviceProvider.CreateScope();
            var logger = scope.ServiceProvider.GetRequiredService<ILoggerHelper>();
            logger.LogInfo(message);
        }
    }
}
