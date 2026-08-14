<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public $withinTransaction = false;

    public function up(): void
    {
        Schema::dropIfExists('webhooks');
        Schema::dropIfExists('api_keys');
        Schema::dropIfExists('support_tickets');
        Schema::dropIfExists('shipments');
        Schema::dropIfExists('inventories');
        Schema::dropIfExists('audit_logs');

        Schema::create('audit_logs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('user');
            $table->string('action');
            $table->text('details');
            $table->string('ip')->nullable();
            $table->string('severity')->default('INFO');
            $table->timestamps();
        });

        Schema::create('inventories', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('sku')->unique();
            $table->string('name');
            $table->string('warehouse');
            $table->integer('quantity')->default(0);
            $table->integer('reorder_point')->default(100);
            $table->string('status')->default('In Stock');
            $table->timestamps();
        });

        Schema::create('shipments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('tracking_id')->unique();
            $table->string('cust_id', 10)->nullable();
            $table->string('carrier');
            $table->string('origin');
            $table->string('destination');
            $table->string('status')->default('In Transit');
            $table->string('temperature')->default('4.0°C');
            $table->string('eta')->nullable();
            $table->timestamps();
        });

        Schema::create('support_tickets', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('ticket_code')->unique();
            $table->string('customer');
            $table->string('subject');
            $table->string('priority')->default('MEDIUM');
            $table->string('status')->default('OPEN');
            $table->string('sla_expires')->default('2h 00m');
            $table->timestamps();
        });

        Schema::create('api_keys', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('cust_id', 10);
            $table->string('name');
            $table->string('prefix');
            $table->timestamp('last_used')->nullable();
            $table->timestamps();
        });

        Schema::create('webhooks', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('cust_id', 10);
            $table->string('url');
            $table->json('events')->nullable();
            $table->string('status')->default('Active');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('webhooks');
        Schema::dropIfExists('api_keys');
        Schema::dropIfExists('support_tickets');
        Schema::dropIfExists('shipments');
        Schema::dropIfExists('inventories');
        Schema::dropIfExists('audit_logs');
    }
};
