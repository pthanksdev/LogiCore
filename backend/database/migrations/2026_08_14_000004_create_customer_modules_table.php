<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public $withinTransaction = false;

    public function up(): void
    {
        Schema::dropIfExists('customer_modules');

        Schema::create('customer_modules', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('cust_id', 10);
            $table->foreign('cust_id')->references('cust_id')->on('customers')->onDelete('cascade');
            $table->uuid('module_id');
            $table->foreign('module_id')->references('id')->on('modules')->onDelete('cascade');
            $table->boolean('is_active')->default(false);
            $table->foreignId('granted_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();

            $table->unique(['cust_id', 'module_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('customer_modules');
    }
};
