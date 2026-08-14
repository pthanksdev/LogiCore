<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tenant_users', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('cust_id', 10);
            $table->foreign('cust_id')->references('cust_id')->on('customers')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->enum('role', ['owner', 'admin', 'billing', 'member'])->default('member');
            $table->timestamps();

            $table->unique(['cust_id', 'user_id']);
        });

        Schema::create('departments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('cust_id', 10);
            $table->foreign('cust_id')->references('cust_id')->on('customers')->onDelete('cascade');
            $table->string('name');
            $table->decimal('budget', 12, 2)->default(0.00);
            $table->timestamps();
        });

        Schema::create('billing_customers', function (Blueprint $table) {
            $table->string('cust_id', 10)->primary();
            $table->foreign('cust_id')->references('cust_id')->on('customers')->onDelete('cascade');
            $table->string('stripe_customer_id')->unique()->nullable();
            $table->string('subscription_status')->default('inactive');
            $table->timestamps();
        });

        Schema::create('invoices', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('cust_id', 10);
            $table->foreign('cust_id')->references('cust_id')->on('customers')->onDelete('cascade');
            $table->string('stripe_invoice_id')->unique()->nullable();
            $table->decimal('amount', 10, 2);
            $table->enum('status', ['open', 'paid', 'void'])->default('open');
            $table->timestamp('due_date')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->text('pdf_url')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('invoices');
        Schema::dropIfExists('billing_customers');
        Schema::dropIfExists('departments');
        Schema::dropIfExists('tenant_users');
    }
};
